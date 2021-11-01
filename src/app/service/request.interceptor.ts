import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private _injector: Injector) {}
  private get generalService() {
    return this._injector.get(GeneralService);
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('online_fd_token') !== null) {
      const token: string = localStorage.getItem('online_fd_token') || '';

      request = request.clone({
        headers: new HttpHeaders({
          token,
        }),
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && this.generalService) {
          } else if (err.status == 500 && this.generalService) {
          }
        }
        return new Observable<HttpEvent<any>>();
      })
    );
  }
}
