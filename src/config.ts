
function requireEnv(key:string): string {
    const value = (import.meta.env as Record<string, string | undefined>)[key];
    if (!value) throw new Error(`Missing required env variable: ${key}`);
    return value;
}

export const config ={
    apiUrl: requireEnv('VITE_API_URL'), //'http://localhost:5000/api' in dev
    appName: requireEnv('VITE_APP_NAME'), //Techbridle App

    //Optional -has a sensible default
    maxItems: Number(import.meta.env.VITE_MAX_ITEM ?? 50),
} as const;

export default config;