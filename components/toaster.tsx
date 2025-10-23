'use client';
 
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';
import { useTheme } from 'next-themes';
 
export default function Toaster() {
  const { resolvedTheme } = useTheme();
 
  return <SonnerToaster expand richColors closeButton theme={resolvedTheme as ToasterProps['theme']} />;
}
