import { environment as env } from '../../environments/environment';

export function e(endpoint: string) {
    return `${env.baseUrl}${endpoint}`;
}