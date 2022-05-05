import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserDTO } from 'src/app/modules/register/components/register/UserDTO';
import { environment } from 'src/environments/environment';

const TOKEN = 'credpagoToken';
const USER = 'credpagoUser';
const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserDTO>({} as UserDTO);
  constructor(private httpClient: HttpClient) {
    if (this.existsToken()) {
      this.initUserSubject();
    }
  }

  getToken() {
    return localStorage.getItem(TOKEN) ?? '';
  }

  getUserStorage() {
    return localStorage.getItem(USER) ?? '';
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  saveUserStorage(user: UserDTO) {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  removeUserStorage() {
    localStorage.removeItem(USER);
  }

  existsToken() {
    return !!this.getToken();
  }

  existsUserStorage() {
    return !!this.getUserStorage();
  }

  getUserSubject(){
    return this.userSubject.asObservable();
  }

  initUserSubject() {
    const userStorage = this.getUserStorage();
    const user = JSON.parse(userStorage);
    this.userSubject.next(user);
  }

  logout() {
    this.removeToken();
    this.removeUserStorage();
    this.userSubject.next({} as UserDTO);
  }

  authenticate(email: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient.post(API + '/auth/token',
          {email, password},
          {observe: 'response'}
        ).pipe(
          tap((response: any) => {
            const data = response ?? '';
            this.saveToken(data.body.token ?? '');
            this.saveUserStorage(data.body.user ?? '');
          })
        )
  }

  register(userDTO: UserDTO) {
    return this.httpClient.post(API + '/auth/register', userDTO);

  }


}
