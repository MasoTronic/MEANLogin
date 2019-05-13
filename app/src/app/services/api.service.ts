import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  login(username:string,password:string): Observable<any>{
    let header = new HttpHeaders();
    // header.append('username',username)
    // header.append('password',password)
console.log(header)
   let options = {
      headers: header
  };

      return this.http.post(this.url+'login',{'username':username,'password':password});
  }


createUser(body){
  console.log(body)
  return this.http.post(this.url+'createUser',body);
}



  getUserInfo(token): Observable<any>{
    let header = new HttpHeaders();
    header.append('x-auth',token);

    return this.http.get(this.url+'getUserInfo',{headers:header});

  }
}
