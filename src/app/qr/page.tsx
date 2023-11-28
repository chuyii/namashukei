'use client';

import { useMemo } from 'react';

import dynamic from 'next/dynamic';

const QRCodeSVG = dynamic(
  () => import('qrcode.react').then((qr) => qr.QRCodeSVG),
  { ssr: false },
);

export default function Page() {
  const originUrl = useMemo(
    () =>
      typeof window !== 'undefined' ? new URL(window.location.href).origin : '',
    [],
  );

  return (
    <QRCodeSVG
      includeMargin={true}
      className="mx-auto h-full w-full"
      value={originUrl}
    />
  );
}
