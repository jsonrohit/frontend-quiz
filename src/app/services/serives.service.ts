import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SerivesService {
  apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = 'http://127.0.0.1:8000/api/';
  }

  get(url: string): Observable<any> {
    var urlStr = this.apiUrl + url;
    return this._http.get(urlStr);
  }

  post(url: string, body:any): Observable<any> {
    var urlStr = this.apiUrl + url;
    return this._http.post(urlStr, body);
  }


}

