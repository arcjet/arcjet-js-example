declare namespace NodeJS {
  export interface ProcessEnv {
    readonly ARCJET_KEY: string;
    readonly AUTH_SECRET: string;
  }
}
