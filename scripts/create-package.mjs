#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

function ask(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(prompt, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
}

function sanitizeName(name) {
  // simple validation: no slashes, not empty, lower-case
  if (!name || typeof name !== 'string') return false;
  // disallow path separators and spaces
  if (name.includes('/') || name.includes('\\') || name.includes(' ')) return false;
  // keep it lowercase
  if (name.toLowerCase() !== name) return false;
  return true;
}

async function replaceInFiles(dir, oldName, newName) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      await replaceInFiles(full, oldName, newName);
    } else if (ent.isFile()) {
      try {
        let content = await fs.readFile(full, 'utf8');
        const re = new RegExp(oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const replaced = content.replace(re, newName);
        if (replaced !== content) {
          await fs.writeFile(full, replaced, 'utf8');
        }
      } catch (e) {
        // binary file or read error; ignore
      }
    }
  }
}

async function main() {
  // ask visibility first
  const visibility = await ask('パッケージの種別を入力してください (public / private): ');
  const isPrivate = visibility === 'private';
  if (!isPrivate && visibility !== 'public') {
    console.error('無効な入力です。"public" または "private" を入力してください。');
    process.exit(1);
  }

  // ask package name
  const pkgName = await ask('新しいパッケージ名を入力してください: ');

  if (!sanitizeName(pkgName)) {
    console.error('無効なパッケージ名です:', pkgName);
    process.exit(1);
  }

  const root = process.cwd();
  const templateDir = isPrivate ? 'private-template' : 'public-template';
  const template = path.join(root, 'packages', templateDir);
  const target = path.join(root, 'packages', pkgName);

  try {
    await fs.access(target);
    console.error('すでに存在します:', target);
    process.exit(1);
  } catch {}

  try {
    // copy but ignore build artifacts and module outputs
    const ignoreNames = new Set(['.turbo', 'dist', 'node_modules', 'tsconfig.tsbuildinfo']);
    await fs.cp(template, target, {
      recursive: true,
      filter: (src) => {
        const rel = path.relative(template, src);
        if (!rel) return true; // root
        const parts = rel.split(path.sep);
        // if any path segment is in ignore list, skip
        for (const p of parts) {
          if (ignoreNames.has(p)) {
            return false;
          }
        }
        return true;
      },
    });
  } catch (e) {
    console.error('テンプレートパッケージのコピーに失敗しました:', e.message);
    process.exit(1);
  }

  // determine the template suffix to replace (e.g. "public-template" or "private-template")
  const templateSuffix = isPrivate ? 'private-template' : 'public-template';
  let oldName = templateSuffix;
  try {
    const tmplPkg = JSON.parse(await fs.readFile(path.join(template, 'package.json'), 'utf8'));
    if (tmplPkg.name) {
      // Verify the suffix is present in the template name, then use the suffix as replacement key
      if (!tmplPkg.name.includes(templateSuffix)) {
        console.warn(
          'テンプレートの name フィールドにサフィックスが見つかりませんでした。フォールバックします。',
        );
        oldName = tmplPkg.name;
      }
    }
  } catch {
    // ignore
  }

  await replaceInFiles(target, oldName, pkgName);

  // update tsconfig.json references
  try {
    const tsPath = path.join(root, 'tsconfig.json');
    const tsContent = JSON.parse(await fs.readFile(tsPath, 'utf8'));
    if (Array.isArray(tsContent.references)) {
      const rel = `./packages/${pkgName}`;
      if (!tsContent.references.find((r) => r.path === rel)) {
        tsContent.references.push({ path: rel });
        await fs.writeFile(tsPath, JSON.stringify(tsContent, null, 2) + '\n', 'utf8');
        console.log('tsconfig.json を更新しました');
      }
    }
  } catch (e) {
    console.warn('tsconfig.json の更新中にエラー:', e.message);
  }

  console.log(`パッケージを作成しました: packages/${pkgName}`);
}

// execute when run directly
main();
