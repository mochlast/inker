import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const connected = searchParams.get('oauth') === 'connected';

  useEffect(() => {
    if (connected && window.opener) {
      window.opener.postMessage({ type: 'oauth-connected' }, window.location.origin);
      window.close();
    }
  }, [connected]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center space-y-4">
        <div className="text-4xl">
          {connected ? '\u2705' : '\u23F3'}
        </div>
        <h1 className="text-xl font-semibold text-text-primary">
          {connected ? 'Connected!' : 'Connecting...'}
        </h1>
        <p className="text-text-muted">
          {connected
            ? 'You can close this window and return to Inker.'
            : 'Please wait while we complete the authorization.'}
        </p>
      </div>
    </div>
  );
}
