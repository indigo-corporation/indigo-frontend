import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {
    
  private apiUrl = 'https://ipinfo.io';
  token = "48ef4cc7fd9710"
  constructor(private http: HttpClient) { }

  

  getIpAddress(): Observable<any> {
    return this.http.get(`${this.apiUrl}/json?token=${this.token}`);
  }
}