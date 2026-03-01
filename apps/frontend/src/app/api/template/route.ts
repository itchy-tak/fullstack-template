import { NextResponse } from 'next/server';

/**
 * API Route テンプレート
 */
export async function GET(): Promise<NextResponse> {
  return await Promise.resolve(
    NextResponse.json({ status: 'ok', message: 'Hello from API route!' }),
  );
}
