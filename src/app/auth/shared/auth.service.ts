import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();
class DecodedToken{
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {

  private decodedToken;
  

  constructor(private http: HttpClient){
    this.decodedToken = JSON.parse(localStorage.getItem('backrrom_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string{
    debugger;
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('backroom_auth', token);
    localStorage.setItem('backrrom_meta',  JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration(){
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData): Observable<any>{
      return this.http.post('api/v1/users/register', userData);
  }

  public login(userData): Observable<any>{
    
    return this.http.post('api/v1/users/auth', userData).pipe(map(
      (token: any) => {
        return this.saveToken(token);
      }
    ));
  }

  public isAuthenticated(): boolean{

    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string{
    return localStorage.getItem('backroom_auth');
  }

  public logout(){
    localStorage.removeItem('backroom_auth');
    localStorage.removeItem('backrrom_meta');

    this.decodedToken = new DecodedToken()
  }

  public getUserName(): string{
    return this.decodedToken.username;
  }

  

}