import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { throwError, Observable, Observer, TimeoutError } from 'rxjs';
import { catchError, retry, map, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  eventSource: any;

  constructor(private http: HttpClient,private _zone: NgZone) { }
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
  public getMethod(SUB_URL: any, nodeName?: any, timeoutVal?: any): Observable<any> {
    var host='';
    if(localStorage.getItem('ls.currentNode') && JSON.parse(localStorage.getItem('ls.currentNode')!)!=null){
     var node = JSON.parse(localStorage.getItem('ls.currentNode')!);
     host= node.protocol+node.IP+':'+node.Port
    }else{
      // host=credentials.API_BASE_URL;
    }
    var url = host + SUB_URL;
    if(timeoutVal!=''  && timeoutVal!=undefined){
      return this.http.get<any>(url).pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError),
        timeout(timeoutVal),
      );
    }else{
      return this.http.get<any>(url).pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      );
    }

  }
  /**
   * POST METHOD
   * @param SUB_URL url
   * @param formData data (file, ...etc.)
   * @param nodeName node name
   * @returns response
   */
  public postMethod(SUB_URL: any, formData: any, nodeName?: any): Observable<any> {
    var host='';
    if(localStorage.getItem('ls.currentNode') && JSON.parse(localStorage.getItem('ls.currentNode')!)!=null){
      var node = JSON.parse(localStorage.getItem('ls.currentNode')!);
      host= node.protocol+node.IP+':'+node.Port
    }else{
      // host=credentials.API_BASE_URL;
    }
    var url = host + SUB_URL;
    return this.http.post<any>(url, formData).pipe(
      map((response: Response) => { return response }),
      catchError(this.handleError)
    );
  }

  
  /**
   * DELETE METHOD
   * @param SUB_URL url
   * @param nodeName node name
   * @returns response
   */
  // public deleteMethod(SUB_URL: any,nodeName?: any): Observable<any> {
  //   var host='';
  //   if(nodeName!='' && nodeName!=undefined){
  //     var nodes = JSON.parse(localStorage.getItem('ls.nodes')!);
  //     nodes.forEach(node => {
  //       if(node.SysName==nodeName)
  //       {
  //         host= node.protocol+node.IP+':'+node.Port
  //       }
  //     });
  //   } else if(localStorage.getItem('ls.currentNode') && JSON.parse(localStorage.getItem('ls.currentNode')!)!=null){
  //    var node = JSON.parse(localStorage.getItem('ls.currentNode')!);
  //    host= node.protocol+node.IP+':'+node.Port
  //   }else{ host=credentials.API_BASE_URL; }
  //   var url = host + SUB_URL;
  //   return this.http.delete<any>(url).pipe(
  //     map((response: Response) => { return response }),
  //     catchError(this.handleError)
  //   );
  // }
  /**
   * GET METHOD FOR EXTERNAL DATA
   * @param URL url
   * @param throwErr error
   * @returns response
   */
  // public getExternalMethod(URL: any, throwErr?:any): Observable<any> {
  //   return this.http.get<any>(URL).pipe(
  //     map((response: Response) => { return response }),
  //     catchError( throwErr!= undefined ?  this.throwCompleteError : this.handleError)
  //   );
  // }
  /**
   * GET EVENT SOURCE METHOD
   * @param SUB_URL url
   * @param nodeName Node Name
   * @returns Response
   */
  // public getEventSource(SUB_URL: string,nodeName?: any): Observable<any> {
  //   var host='';
  //   if(nodeName!='' && nodeName!=undefined){
  //     var nodes = JSON.parse(localStorage.getItem('ls.nodes')!);
  //     nodes.forEach(node => {
  //       if(node.SysName==nodeName)
  //       {
  //         host= node.protocol+node.IP+':'+node.Port
  //       }
  //     });
  //   } else if(localStorage.getItem('ls.currentNode') && JSON.parse(localStorage.getItem('ls.currentNode')!)!=null){
  //    var node = JSON.parse(localStorage.getItem('ls.currentNode')!);
  //    host= node.protocol+node.IP+':'+node.Port
  //   }else{ host=credentials.API_BASE_URL; }
  //   var url = host + SUB_URL;
  //   return new Observable((observer: Observer<object>) => {
  //     this.eventSource = new EventSource(url);
  //     this.eventSource.onmessage = event => {
  //       this._zone.run(() => {
  //         observer.next(event);
  //       });
  //     };
  //     this.eventSource.onerror = error => {
  //       this._zone.run(() => {
  //         observer.error(error);
  //       });
  //     };
  //     this.eventSource.complete = complete => {
  //       this._zone.run(() => {
  //         observer.complete();
  //       });
  //     };
  //   });
  // }
  // /**
  //  * CLOSE EVENT SOURCE REQUEST
  //  */
  // public closeEventSource() {
  //   if (!! this.eventSource) {
  //      this.eventSource.close();
  //   }
  // }
}
