import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var token:any= JSON.parse(localStorage.getItem('user')!);
    console.warn(token.data.token);
    const apiKey = 'Rohol Amin'
    request = request.clone({
        setHeaders: {
            'x-access-token': apiKey,
        }
    })
    return next.handle(request);
  }
}
