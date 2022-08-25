import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError, Observable, Observer, TimeoutError } from 'rxjs';
import { catchError, retry, map, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,private _zone: NgZone
  ) { }

   /**
     * Handeling errors
     * @param error
     */
    private handleError(error: HttpErrorResponse) {
      if (error.status === 0 && error.error instanceof ProgressEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        //console.log('Client side error:', error.error);
        return throwError(error);
      }
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        //if (error.status == 0) {
          //this.navigation.navigate('/', '')
        //}
        // console.error(
        //   `Backend returned code ${error.status}, ` +
        //   `body was: ${error.error}`);
      }
      return throwError('Something bad happened; please try again later.');
    };
    private throwCompleteError(error: HttpErrorResponse) {
      return throwError(error);
    };
    /**
     * GET METHOD
     * @param SUB_URL url
     * @param nodeName node name
     * @param timeoutVal request timeout time
     * @returns response
     */
    public getMethod(SUB_URL: any, timeoutVal?: any): Observable<any> {

      if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!)!=null){
       var userData = JSON.parse(localStorage.getItem('user')!);
      }else{
        // host=credentials.API_BASE_URL;
      }

      var url = environment.apiUrl +SUB_URL
      if(timeoutVal!=''  && timeoutVal!=undefined){
        return this.http.get<any>(url)
        .pipe(map((response : Response) => { return response }),
          catchError(this.handleError),
          timeout(timeoutVal),
        );
      }else{
        return this.http.get<any>(url).pipe(
          map((response: Response) => { return response }),
          catchError(this.handleError));
      }
    }

}
