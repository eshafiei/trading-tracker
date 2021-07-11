import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class BackendRequestsInterceptor implements HttpInterceptor {
  loaderToShow: any;
  constructor(private loaderService: LoaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loaderService.present();
      return next.handle(req).pipe(
        finalize(() => {
          this.loaderService.dismiss();
        })
      );
    };
}
