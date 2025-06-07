#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

function getRepoName() {
  try {
    const url = execSync('git config --get remote.origin.url').toString().trim();
    if (!url) {
      throw new Error('no remote url');
    }
    let name = url.split('/').pop() || '';
    if (name.endsWith('.git')) {
      name = name.slice(0, -4);
    }
    return name;
  } catch (e) {
    console.error('unable to determine git remote url, falling back to cwd');
    return path.basename(process.cwd());
  }
}

async function replaceInFile(filePath, repoName) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const updated = content.replace(/fullstack-template/g, repoName);
    if (content !== updated) {
      await fs.writeFile(filePath, updated, 'utf8');
      console.log(`Replaced occurrences in ${filePath}`);
    } else {
      console.log(`no replacements needed in ${filePath}`);
    }
  } catch (err) {
    console.error(`error processing ${filePath}:`, err.message);
    process.exitCode = 1;
  }
}

async function main() {
  const repoName = getRepoName();
  console.log('using repository name:', repoName);

  const root = process.cwd();
  await replaceInFile(path.join(root, '.devcontainer', 'devcontainer.json'), repoName);
  await replaceInFile(path.join(root, 'package.json'), repoName);
  await replaceInFile(path.join(root, 'packages', 'package-template', 'package.json'), repoName);
}

main();
