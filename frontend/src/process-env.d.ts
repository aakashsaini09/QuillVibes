declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      VITE_BACKEND_URL: string;
      VITE_API_Key: string;
      // add more environment variables and their types here
    }
  }
}
