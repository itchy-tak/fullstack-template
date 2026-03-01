/**
 * api-types
 *
 * Frontend / Backend 間で共有する API IF の定義。
 * openapi-typescript により OpenAPI spec から自動生成される型を
 * Operation 名ベースのユーティリティ型として公開する。
 *
 * 主要な export:
 * - Operation         … 全 API Operation 名のユニオン型
 * - OperationPath     … Operation 名 → パスリテラル型
 * - OperationMethod   … Operation 名 → HTTP メソッドリテラル型
 * - OperationRequest  … Operation 名 → リクエストボディ型
 * - OperationResponse … Operation 名 → レスポンスボディ型
 * - OperationPathParams … Operation 名 → パスパラメータ型
 */

// ---------------------------------------------------------------------------
// 1. 自動生成型の re-export
// ---------------------------------------------------------------------------
export type { components, operations, paths, webhooks } from './__generated__/generated';
export type { OperationMap } from './__generated__/operation-map';
export { OPERATION_MAP } from './__generated__/operation-map';

// ---------------------------------------------------------------------------
// 2. 内部 import
// ---------------------------------------------------------------------------
import type { operations, paths } from './__generated__/generated';
import type { OperationMap } from './__generated__/operation-map';

// ---------------------------------------------------------------------------
// 3. Operation 名ベースのユーティリティ型
// ---------------------------------------------------------------------------

/** 全 API Operation 名のユニオン型 */
export type Operation = keyof operations;

/** Operation 名 → パスリテラル型 */
export type OperationPath<O extends Operation> = OperationMap[O]['path'];

/** Operation 名 → HTTP メソッドリテラル型 */
export type OperationMethod<O extends Operation> = OperationMap[O]['method'];

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

/** Operation 名 → リクエストボディ型 */
export type OperationRequest<O extends Operation> =
  OperationPath<O> extends keyof paths
    ? OperationMethod<O> extends keyof paths[OperationPath<O>] & HttpMethod
      ? paths[OperationPath<O>][OperationMethod<O>] extends {
          requestBody: { content: { 'application/json': infer T } };
        }
        ? T
        : never
      : never
    : never;

/** Operation 名 → レスポンスボディ型（成功レスポンス） */
export type OperationResponse<O extends Operation> =
  OperationPath<O> extends keyof paths
    ? OperationMethod<O> extends keyof paths[OperationPath<O>] & HttpMethod
      ? paths[OperationPath<O>][OperationMethod<O>] extends { responses: infer R }
        ? R[keyof R & number] extends { content: { 'application/json': infer T } }
          ? T
          : never
        : never
      : never
    : never;

/** Operation 名 → パスパラメータ型 */
export type OperationPathParams<O extends Operation> =
  OperationPath<O> extends keyof paths
    ? OperationMethod<O> extends keyof paths[OperationPath<O>] & HttpMethod
      ? paths[OperationPath<O>][OperationMethod<O>] extends {
          parameters: { path: infer T };
        }
        ? T
        : never
      : never
    : never;
