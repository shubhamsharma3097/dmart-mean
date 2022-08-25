import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../common/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  // public getUserData(URL){
  //   var queryStr = 'requestor=WVP&TYPE=COMMON&command=USER_ADMIN&ADMIN=GETUSER&USER='+ logonInfo;
  //   return this.appService.postMethod('/homepage',queryStr,nodeName);
  // }
}
