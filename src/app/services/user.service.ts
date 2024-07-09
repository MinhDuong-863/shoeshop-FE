import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/resgister.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { UserResponse } from '../responses/user/user.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetails = `${environment.apiBaseUrl}/users/details`;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService
  ) { }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any>{
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
  getUserDetails(token: string) {
    return this.http.post(this.apiUserDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    }, this.apiConfig);
  }
  saveUserToLocalStorage(userResponse?: UserResponse) {
    try{
      if(!userResponse || userResponse == null) return;
      //Convert the user response object to a json string
      const userResponseJSON = JSON.stringify(userResponse);
      //Save the user response to local storage
      localStorage.setItem('user', userResponseJSON);
      console.log('User response saved to local storage');
    }catch(error){
      console.error('Error saving user response to local storage: ', error);
    }
  }
  getUserToLocalStorage() {
    try{
      //Retrieve the json string from local storage
      const userResponseJSON = localStorage.getItem('user');
      if(!userResponseJSON || userResponseJSON == null) return;
      //Parse the json string back to an object
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage');
    }catch(error){
      console.error('Error saving user response to local storage: ', error);
      return;
    }
  }
}
