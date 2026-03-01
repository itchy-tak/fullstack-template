'use server';

/**
 * Operation 名ベースの型安全 API クライアント（Server Action）。
 *
 * 内部で openapi-fetch を使用し、OPERATION_MAP から path/method を自動解決する。
 * `'use server'` により、クライアントコンポーネントから直接呼び出せる Server Action として動作する。
 * BACKEND_URL には直接アクセスするためサーバーサイドでのみ動作する。
 *
 * @example
 * ```ts
 * // パラメータなし
 * const users = await apiClient('UsersController_findAll');
 *
 * // path params + body
 * const updated = await apiClient('UsersController_update', {
 *   path: { id: 1 },
 *   body: { name: 'new name' },
 * });
 *
 * // body のみ
 * const created = await apiClient('UsersController_create', {
 *   body: { email: 'a@b.com', name: 'Alice' },
 * });
 * ```
 */
import type {
  Operation,
  OperationPathParams,
  OperationRequest,
  OperationResponse,
  paths,
} from 'api-types';
import { OPERATION_MAP } from 'api-types';
import { unstable_noStore as noStore } from 'next/cache';
import createClient from 'openapi-fetch';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:5000';

// ---------------------------------------------------------------------------
// openapi-fetch client (internal)
// ---------------------------------------------------------------------------
const client = createClient<paths>({ baseUrl: BACKEND_URL });

// ---------------------------------------------------------------------------
// Params type — path / body の有無に応じて必要なプロパティだけ要求する
// ---------------------------------------------------------------------------

/** Operation ごとに必要なパラメータをまとめた型 */
export type ApiClientParams<O extends Operation> = ([OperationPathParams<O>] extends [never]
  ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {}
  : { path: OperationPathParams<O> }) &
  ([OperationRequest<O>] extends [never]
    ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      {}
    : { body: OperationRequest<O> });

/** パラメータが空（必須キーなし）なら true */
type IsParamsEmpty<O extends Operation> = keyof ApiClientParams<O> extends never ? true : false;

// ---------------------------------------------------------------------------
// API Client
// ---------------------------------------------------------------------------

export async function apiClient<O extends Operation>(
  operation: O,
  ...args: IsParamsEmpty<O> extends true
    ? [params?: ApiClientParams<O>]
    : [params: ApiClientParams<O>]
): Promise<OperationResponse<O>> {
  noStore();
  const rawParams = args[0];
  const { path: routePath, method } = OPERATION_MAP[operation];

  const methodFn = {
    get: client.GET,
    post: client.POST,
    put: client.PUT,
    patch: client.PATCH,
    delete: client.DELETE,
  }[method];

  const init: Record<string, unknown> = {};
  if (rawParams !== undefined && 'path' in rawParams) {
    init.params = { path: rawParams.path };
  }
  if (rawParams !== undefined && 'body' in rawParams) {
    init.body = rawParams.body;
  }

  // openapi-fetch の動的メソッド呼び出しにより静的型解決が不可能なため型の上書きを許容
  const { data, error } = await (
    methodFn as unknown as (
      p: string,
      i: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: unknown }>
  )(routePath, init);

  if (error !== undefined) {
    throw new Error(`API Error [${operation}]: ${JSON.stringify(error)}`);
  }

  // openapi スキーマにより型安全性が担保される動的ディスパッチのため型の上書きを許容
  return data as OperationResponse<O>;
}
