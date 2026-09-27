import { Environment } from "../app/core/models/environment.model";

export const environment : Environment = {
    production: true,
    apiUrl: 'http://localhost:5208/api',
    appVersion: '1.0.0',
    enableLogging: false,
}