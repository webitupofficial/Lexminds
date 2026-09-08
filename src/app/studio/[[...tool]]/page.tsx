'use client';

import { NextStudio } from 'next-sanity/studio';
import sanityConfig from '../../../../sanity.config';

export const dynamic = 'force-static';

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900 overflow-hidden">
      <NextStudio config={sanityConfig} />
    </div>
  );
}
