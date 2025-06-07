import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:5000';

/**
 * API Route テンプレート
 *
 * バックエンドの /health を呼び出し、結果を返す。
 * 外部リクエスト時の CORS 対策や独自ロジックを挟む例として利用できる。
 */
export async function GET(): Promise<NextResponse> {
  try {
    const res = await fetch(`${BACKEND_URL}/health`, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json(
        { status: 'error', message: 'Backend unreachable' },
        { status: res.status },
      );
    }
    const data: unknown = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ status: 'error', message: 'Backend unreachable' }, { status: 503 });
  }
}
