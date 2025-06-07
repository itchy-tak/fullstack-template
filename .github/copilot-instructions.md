# Coding Conventions

## Control Flow

- `if` 文では必ずブロック `{}` を使用する。ガード節 (`if (...) return ...;`) のような波括弧なしの単文は禁止。

```ts
// NG
if (!user) return null;

// OK
if (!user) {
  return null;
}
```

## Strict Comparison

- 比較には常に `===` / `!==` を使用する。`==` / `!=` は禁止。

## Type Safety

- `any` の使用は原則禁止。型が不明な場合は `unknown` を使い、型ガードで絞り込む。
- `as` によるキャストは原則禁止。自動生成コード内での使用は許容するが、手書きコードでは型ガードや型推論で対応する。
