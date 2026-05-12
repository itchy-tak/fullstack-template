---
applyTo: '.github/**'
---

# GitHub Copilot カスタマイズファイル配置ガイド

このドキュメントは、`.github` ディレクトリ配下に配置する GitHub Copilot カスタマイズファイルの種類・役割・配置場所をまとめたものです。

参考: [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

---

## ディレクトリ構成例

```
.github/
├── copilot-instructions.md          # カスタムインストラクション（リポジトリ全体に常時適用）
├── instructions/
│   ├── frontend.instructions.md     # カスタムインストラクション（パス指定・自動適用）
│   └── backend.instructions.md
├── prompts/
│   ├── generate-tests.prompt.md     # プロンプトファイル（手動で呼び出して使う雛形）
│   └── code-review.prompt.md
├── agents/
│   └── reviewer.md                  # カスタムエージェント定義
└── skills/
    └── deploy/
        └── SKILL.md                 # エージェントスキル（関連タスク時に自動ロード）
```

---

## 各ファイルの概要

### `copilot-instructions.md`

- **種別**: カスタムインストラクション（リポジトリ全体）
- **動作**: リポジトリ内のすべての Copilot インタラクションに自動適用される
- **用途**: コーディング規約、アクセシビリティルール、レビューチェックリストなど、広く適用したい標準・方針の記述
- **備考**: 通常の Markdown。フロントマター不要。

### `instructions/*.instructions.md`

- **種別**: カスタムインストラクション（パス指定）
- **動作**: フロントマターで指定したパスに一致するファイルを扱う際に自動適用
- **用途**: フロントエンドとバックエンドで異なる規約を適用するなど、対象を絞ったガイドライン
- **フロントマター**（ファイル先頭の `---` ブロックに YAML で記述）:

  ```yaml
  ---
  applyTo: 'apps/frontend/**' # 必須。glob パターン。複数はカンマ区切り: "**/*.ts,**/*.tsx"
  excludeAgent: 'code-review' # 省略可。"code-review" または "cloud-agent" を除外
  ---
  ```

### `prompts/*.prompt.md`

- **種別**: プロンプトファイル
- **動作**: チャットから手動で呼び出す再利用可能なプロンプトテンプレート
- **用途**: ユニットテスト生成・コードレビューなど、毎回異なる入力で繰り返し実行するタスク
- **フロントマター**（ファイル先頭の `---` ブロックに YAML で記述）:

  ```yaml
  ---
  description: '説明文' # /コマンド一覧・editor に表示
  agent: ask # ask | agent | plan | カスタムエージェント名
  tools:
    - built-in-tool-name
    - server-name/tool-name # サーバー名/ツール名 で一意に指定
    - server-name/* # サーバーの全ツール
  ---
  ```

  **本文中で使用できる変数**

  | 変数                   | 展開タイミング | 内容                                                                           |
  | ---------------------- | -------------- | ------------------------------------------------------------------------------ |
  | `${selection}`         | VS Code        | エディタで選択中のテキスト                                                     |
  | `${input:name}`        | LLM            | プロンプト実行時に LLM がユーザーへ入力を求める。`name` は変数名（内部識別子） |
  | `${input:name:ヒント}` | LLM            | 同上。`ヒント` はユーザーへ表示するプレースホルダーテキスト                    |

  使用例:

  ```markdown
  ${selection} のコードを、${input:language:対象言語を入力} に移植してください。
  ```

### `agents/*.md`

- **種別**: カスタムエージェント
- **動作**: IDE のエージェントドロップダウンから選択して呼び出す
- **用途**: 特定の役割・制約・ツールセットを持つ専門エージェントの定義
- **フロントマター**（ファイル先頭の `---` ブロックに YAML で記述）:

  ```yaml
  ---
  description: '説明文' # ドロップダウン・editor に表示
  tools:
    - server-name/tool-name # 列挙したもの以外は使用不可になる（権限の絞り込み）
    - server-name/*
  ---
  ```

### `skills/<skill-name>/SKILL.md`

- **種別**: エージェントスキル
- **動作**: プロンプトの内容に応じて Copilot が自動的にロードする
- **用途**: 複数ステップのワークフローや付随アセットをまとめたスキルパッケージ
- **フロントマター**（ファイル先頭の `---` ブロックに YAML で記述）:

  ```yaml
  ---
  description: '説明文' # 必須。Copilot のロード判断に使用。具体的なキーワードを入れるほど自動選択精度が上がる
  ---
  ```

  - スキルフォルダにスクリプトや設定ファイルを同梱でき、`SKILL.md` から参照可能。

---

## 補足

- MCP サーバーの設定は `.github/` には含まれません。VS Code でのリポジトリレベルの設定場所は `.vscode/mcp.json` です。
  ```json
  {
    "servers": {
      "my-server": {
        "type": "stdio",
        "command": "node",
        "args": ["./mcp-server/index.js"]
      }
    }
  }
  ```
