import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  fetchTableData(url): Promise<any> {
    return this.http.get(url, { headers: { 'Content-Type': 'application/json'}}).toPromise();
  }
  sendData(url, data): Promise<any> {
    return this.http.put(url, data).toPromise();
  }
  createUser(url, data): Promise<any> {
    return this.http.post(url, data).toPromise();
  }
}
