import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { SignIn, User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // private loggedIn = new BehaviorSubject<boolean>(false);
    // isLoggedIn$ = this.loggedIn.asObservable();
    // private apiUrl = "https://locallhost/500/auth";
    // constructor(private http: HttpClient) { 
    //   const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    // this.loggedIn.next(!!token);
    // }

    // signIn(details: SignIn) {
    //   return this.http.post<any>(`${this.apiUrl}/login`, details, {
    //     headers: { 'Content-Type': 'application/json' }
    //   }).pipe(
    //     tap(response => {
    //       sessionStorage.setItem('token', response.token);
    //       this.loggedIn.next(true);
    //     })
    //   );
    // }
    private apiUrl = "http://localhost:3000/api/auth";
    status: 'login' | 'register' = 'register';
    constructor(private http: HttpClient) { }
    addUser(details: User) {
      return this.http.post<any>(`${this.apiUrl}/${this.status}`, details);
    }
    updateStatus(status: 'login' | 'register') {
      this.status = status;
    }
  }

