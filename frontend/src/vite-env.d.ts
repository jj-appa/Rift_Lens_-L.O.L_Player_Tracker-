/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly RIOT_APIKEY?: string;
    readonly VITE_APP_ENV?: string;
    readonly VITE_API_BASE_URL?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
