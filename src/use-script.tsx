import { useState, useEffect } from 'react';

export interface ScriptProps {
  src: HTMLScriptElement['src'];
}

export default function useScript({ src }: ScriptProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorEvent | null>(null);

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.src = src;

    const handleLoad = () => setLoading(false);
    const handleError = (error: ErrorEvent) => setError(error);

    scriptEl.addEventListener('load', handleLoad);
    scriptEl.addEventListener('error', handleError);

    document.body.appendChild(scriptEl);

    return () => {
      scriptEl.removeEventListener('load', handleLoad);
      scriptEl.removeEventListener('error', handleError);
    };
  }, [src]);

  return {
    loading,
    error
  };
}
