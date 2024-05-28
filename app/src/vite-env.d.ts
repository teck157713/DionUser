/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string,
    readonly VITE_WEBSOCKET_URL: string,
    readonly VITE_STRIPE_PUBLISHABLE_KEY: string,
    readonly VITE_APP_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
