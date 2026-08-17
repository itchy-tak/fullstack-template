<p align="center">
  <h1 align="center">fullstack-template</h1>
  <p align="center">
    Next.js + NestJS + Prisma で作るフルスタック Web アプリのテンプレート<br>
    Dev Container 対応でクリーンな開発環境をすぐに立ち上げられます
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white&style=flat-square" alt="Next.js">
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white&style=flat-square" alt="NestJS">
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white&style=flat-square" alt="Prisma">
  <img src="https://img.shields.io/badge/Mantine-8-339AF0?logo=mantine&logoColor=white&style=flat-square" alt="Mantine">
  <img src="https://img.shields.io/badge/pnpm-9-F69220?logo=pnpm&logoColor=white&style=flat-square" alt="pnpm">
  <img src="https://img.shields.io/badge/Turborepo-2-EF4444?logo=turborepo&logoColor=white&style=flat-square" alt="Turborepo">
</p>

---

## ✨ Features

- **GitHub / Google 認証** — next-auth v5 による OAuth ログイン、`/protected` 配下は認証必須
- **型安全 API クライアント自動生成** — NestJS のコードからOpenAPI JSONを生成し、`api-types` パッケージ経由でフロントエンドの型を自動同期
- **Server Action ベースの API 呼び出し** — `apiClient('OperationName', params)` の一行で型安全にAPIを呼べる
- **二重認証** — フロントエンド→バックエンド間は JWT（セッションから自動発行）＋内部シークレットで保護。内部シークレットはタイミング攻撃対策済み
- **アクセスログ・エラーフィルター** — リクエストログとグローバル例外ハンドリングが標準搭載
- **レスポンシブ UI** — Mantine v8 ベース
- **プロジェクト初期化スクリプト** — `pnpm init-project` でテンプレート文字列をリポジトリ名に一括置換
- **パッケージ追加スクリプト** — `pnpm create-package` で共有パッケージの雛形を即生成
- **devcontainer 対応** — VS Code Dev Containers ですぐ開発環境が整う
- **GitHub Copilot カスタマイズ** — `.github/instructions/` によるプロジェクト固有の Copilot 設定済み

---

## 🛠 Tech Stack

| 技術                                                   | バージョン | 役割                             |
| ------------------------------------------------------ | ---------- | -------------------------------- |
| [Next.js](https://nextjs.org/)                         | ^16        | Web フロントエンドフレームワーク |
| [React](https://react.dev/)                            | ^19        | UI ライブラリ                    |
| [NestJS](https://nestjs.com/)                          | ^11        | API サーバーフレームワーク       |
| [Prisma](https://www.prisma.io/)                       | ^6         | ORM / マイグレーション           |
| [PostgreSQL](https://www.postgresql.org/)              | —          | リレーショナル DB                |
| [Mantine](https://mantine.dev/)                        | ^8         | UI コンポーネントライブラリ      |
| [next-auth](https://authjs.dev/)                       | v5         | OAuth 認証（GitHub / Google）    |
| [openapi-fetch](https://openapi-ts.dev/openapi-fetch/) | —          | 型安全 API クライアント          |
| [Turborepo](https://turbo.build/)                      | ^2         | モノレポタスクランナー           |
| [TypeScript](https://www.typescriptlang.org/)          | ^5         | 型安全な JavaScript              |

---

## 📁 プロジェクト構成

```
.
├── apps/
│   ├── backend/        # NestJS API サーバー
│   └── frontend/       # Next.js Web アプリ
├── packages/
│   ├── api-types/      # OpenAPI から自動生成される型・クライアント定義
│   ├── ui/             # 共有 UI コンポーネント（拡張用）
│   ├── public-template/   # 公開パッケージのテンプレート
│   ├── private-template/  # 非公開パッケージのテンプレート
│   ├── eslint-config-base/ # 共有 ESLint 設定
│   └── typescript-config/  # 共有 TypeScript 設定
└── scripts/
    ├── init-project.mjs    # テンプレート初期化スクリプト
    └── create-package.mjs  # パッケージ追加スクリプト
```

---

## 🚀 Getting Started

### 前提条件

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) v9+
- [Docker](https://www.docker.com/)（devcontainer 使用の場合）

### セットアップ

**1. リポジトリをクローン**

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

**2. Dev Container を起動**（推奨）

VS Code のコマンドパレット（`Ctrl+Shift+P`）から **「Reopen in Container」** を実行します。PostgreSQL も自動で起動します。

**3. テンプレート文字列をリポジトリ名に置換**（初回のみ）

```bash
pnpm init-project
```

**4. 依存関係をインストール**

```bash
pnpm install
```

**5. 環境変数ファイルを生成**

```bash
pnpm cp:env
```

**6. 開発サーバーを起動**

```bash
pnpm dev
```

---

## 🔑 認証

```env
# next-auth
AUTH_SECRET=          # openssl rand -base64 32 で生成

# GitHub OAuth（https://github.com/settings/developers で取得）
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Google OAuth（https://console.cloud.google.com/ で取得）
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

---

## 🔌 API 型自動生成の仕組み

```
apps/backend/ (NestJS + @nestjs/swagger)
    ↓ pnpm generate
packages/api-types/src/__generated__/openapi.json   # OpenAPI スキーマ
packages/api-types/src/__generated__/operation-map.ts  # Operation → path/method マップ
    ↓ フロントエンドが参照
apps/frontend/ → apiClient('AuthorsController_findAll')  # 型安全に呼べる
```

**バックエンド変更後:**

```bash
pnpm generate
```

**フロントエンドでの使い方:**

```ts
// Server Action 内から Operation 名で呼ぶだけ
const authors = await apiClient('AuthorsController_findAll');

// パスパラメータやリクエストボディも型補完が効く
const post = await apiClient('PostsController_update', {
  path: { id: 1 },
  body: { title: '新しいタイトル' },
});
```

---

## 📦 パッケージの追加

```bash
pnpm create-package
```

---

## 📝 よく使うコマンド

```bash
# 開発サーバー起動（フロント・バック同時）
pnpm dev

# 全パッケージをビルド
pnpm build

# Lint・型チェック・テスト
pnpm lint
pnpm typecheck
pnpm test

# コードフォーマット
pnpm format

# OpenAPI JSON と Prisma クライアントを再生成
pnpm generate

# 新規共有パッケージを追加
pnpm create-package
```
