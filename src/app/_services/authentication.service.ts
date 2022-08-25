import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public getToken(): any {
    var userData = JSON.parse(localStorage.getItem('user')!);
    console.warn("sdfdsbj",userData);
    if(userData !== null){
      var token = userData.data.token
      return token;
    }else{
      console.warn("sdfdsbjFsd.gdsmgh");
    }
  }

  public isLoggedIn(){
    return !!localStorage.getItem('user')
  }

  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = this.getToken();
  //   // return a boolean indicating whether or not the token is expired
  //   return tokenNotExpired(token);
  // }
}
