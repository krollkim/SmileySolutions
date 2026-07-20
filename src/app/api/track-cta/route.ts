// First-party WhatsApp-CTA click counter.
//
// POST  /api/track-cta          — records one click (called via sendBeacon).
// GET   /api/track-cta?token=…  — returns the totals (guarded by CTA_STATS_TOKEN).
//
// Storage is Netlify Blobs: durable, first-party, no cookies, no third party.
// Each click is stored as its own record under a time-based key, so concurrent
// clicks never race over a shared counter — the total is simply the record count.

import { getStore } from '@netlify/blobs';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const STORE_NAME = 'cta-clicks';
const KEY_PREFIX = 'clicks/';
const MAX_SOURCE_LENGTH = 40;

interface ClickRecord {
  source: string;
  at: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let source = 'unknown';
    try {
      const body = (await request.json()) as { source?: unknown };
      if (typeof body?.source === 'string' && body.source.trim()) {
        source = body.source.trim().slice(0, MAX_SOURCE_LENGTH);
      }
    } catch {
      // Body is optional — a bare beacon still counts as a click.
    }

    const now = new Date();
    const month = now.toISOString().slice(0, 7); // YYYY-MM
    const unique = Math.random().toString(36).slice(2, 10);
    const key = `${KEY_PREFIX}${month}/${now.toISOString()}-${unique}`;

    const store = getStore(STORE_NAME);
    const record: ClickRecord = { source, at: now.toISOString() };
    await store.setJSON(key, record);

    return new NextResponse(null, { status: 204 });
  } catch {
    // Tracking must never surface an error to the client (or to sendBeacon).
    return new NextResponse(null, { status: 204 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.nextUrl.searchParams.get('token');
  const expected = process.env.CTA_STATS_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const store = getStore(STORE_NAME);
    const { blobs } = await store.list({ prefix: KEY_PREFIX });

    const byMonth: Record<string, number> = {};
    for (const blob of blobs) {
      const month = blob.key.split('/')[1] ?? 'unknown'; // clicks/YYYY-MM/…
      byMonth[month] = (byMonth[month] ?? 0) + 1;
    }

    return NextResponse.json({ total: blobs.length, byMonth });
  } catch {
    return NextResponse.json({ error: 'stats_unavailable' }, { status: 500 });
  }
}
