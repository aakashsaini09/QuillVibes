declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        BACKEND_URL: string;
        API_Key: string;
        // add more environment variables and their types here
      }
    }
  }
  