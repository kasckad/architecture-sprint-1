export function register(email: any, password: any): Promise<any>;
export function login(email: any, password: any): Promise<{
    token: string;
}>;
export function checkToken(token: any): Promise<any>;
