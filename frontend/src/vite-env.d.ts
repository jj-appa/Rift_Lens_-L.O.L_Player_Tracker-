/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly RIOT_APIKEY?: string;
    readonly VITE_APP_ENV?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
