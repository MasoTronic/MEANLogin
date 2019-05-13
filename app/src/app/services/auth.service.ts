import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  login(username:string,password: string): Observable<any>{
   return this.api.login(username,password);
   
  }
  create(body): Observable<any>{
    return this.api.createUser(body);
    
   }
   isLoggedIn(){
    return localStorage.getItem('authToken') !== null;

  }
  getUserInfo()
  {
   let token = localStorage.getItem('authToken');
    if(token)
    {
      this.api.getUserInfo(token).subscribe(res => {
        console.log(res);
      });
    }
  }
}
