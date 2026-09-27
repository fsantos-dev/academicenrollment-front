import { Environment } from "../app/core/models/environment.model";

export const environment : Environment = {
    production: false,
    apiUrl: 'http://localhost:5208/api',
    appVersion: '1.0.0-dev',
    enableLogging: true,
}