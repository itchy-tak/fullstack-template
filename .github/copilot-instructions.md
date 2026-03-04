# Coding Conventions

## Control Flow

- `if` 文では必ずブロック `{}` を使用する。ガード節 (`if (...) return ...;`) のような波括弧なしの単文は禁止。

```ts
// NG
if (!author) return null;

// OK
if (!author) {
  return null;
}
```

## Strict Comparison

- 比較には常に `===` / `!==` を使用する。`==` / `!=` は禁止。

## Type Safety

- `any` の使用は原則禁止。型が不明な場合は `unknown` を使い、型ガードで絞り込む。
- `as` によるキャストは原則禁止。自動生成コード内での使用は許容するが、手書きコードでは型ガードや型推論で対応する。

## UI コンポーネント（フロントエンド）

- フロントエンド（`apps/frontend`）では UI コンポーネントに **Mantine** を使用する。
- `<div>`, `<p>`, `<h1>` などの素の HTML 要素ではなく、対応する Mantine コンポーネント（`Container`, `Text`, `Title`, `Card` など）を優先して使用する。

## 言語ポリシー

- 下記などのテキストについて、言語は**日本語**を使用してください。
  - レビューコメント
  - ソースコードのコメント
  - Git コミットメッセージ
  - Copilot Chat での返答
  - Copilot 内部思考ログ
  - Issue や PR の本文
