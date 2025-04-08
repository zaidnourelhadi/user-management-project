import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = "http://localhost:8080";


   // Add these BehaviorSubjects to track authentication state
   private authState = new BehaviorSubject<boolean>(this.isAuthenticated());
   private adminState = new BehaviorSubject<boolean>(this.isAdmin());
   private userState = new BehaviorSubject<boolean>(this.isUser());
 
   // Expose as observables
   isAuthenticated$ = this.authState.asObservable();
   isAdmin$ = this.adminState.asObservable();
   isUser$ = this.userState.asObservable();
 



  constructor(private http: HttpClient) {

    this.authState.next(this.isAuthenticated());
    this.adminState.next(this.isAdmin());
    this.userState.next(this.isUser());
   }



  // Update your login method
  async login(email: string, password: string): Promise<any> {
    const url = `${this.BASE_URL}/auth/login`;
    try {
      const response = await this.http.post<any>(url, {email, password}).toPromise();
      if(response.statusCode == 200){
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        // Update the auth states
        this.authState.next(true);
        this.adminState.next(response.role === 'ADMIN');
        this.userState.next(response.role === 'USER');
      }
      return response;
    } catch(error) {
      throw error;
    }
  }


  async register(userData:any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/auth/register`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.post<any>(url, userData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getAllUsers(token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-all-users`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getYourProfile(token:string):Promise<any>{
    const url = `${this.BASE_URL}/adminuser/get-profile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getUsersById(userId: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-users/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async deleteUser(userId: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/delete/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.delete<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateUSer(userId: string, userData: any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/update/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.put<any>(url, userData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  // Update your logout method
  logOut(): void {
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    // Update the auth states
    this.authState.next(false);
    this.adminState.next(false);
    this.userState.next(false);
  }


  isAuthenticated(): boolean {
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;

  }

  isAdmin(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'ADMIN'
    }
    return false;

  }

  isUser(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'USER'
    }
    return false;

  }


}
