import React from "react";
import Turnstile from "react-cloudflare-turnstile";

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
  className?: string;
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onSuccess,
  onError,
  onExpired,
  className = "",
}) => {
  return (
    <div className={className}>
      <Turnstile
        turnstileSiteKey={TURNSTILE_SITE_KEY}
        callback={onSuccess}
        theme="light"
        refreshExpired="auto"
        errorCallback={onError}
        expiredCallback={onExpired}
        retry="auto"
        retryInterval={5000}
      />
    </div>
  );
};
