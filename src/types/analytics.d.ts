export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: {
      load: (pixelId: string, options?: Record<string, unknown>) => void;
      page: () => void;
      track: (event: string, props?: Record<string, unknown>) => void;
      identify: (props: Record<string, unknown>) => void;
      methods: string[];
      setAndDefer: (target: unknown, method: string) => void;
      instance: (id: string) => unknown;
      _i?: Record<string, unknown>;
      _t?: Record<string, number>;
      _o?: Record<string, unknown>;
    };
    TiktokAnalyticsObject?: string;
  }
}
