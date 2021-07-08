import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendRequestsInterceptor } from './backend-requests.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BackendRequestsInterceptor, multi: true }
];
