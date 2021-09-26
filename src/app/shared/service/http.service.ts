import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getData(url: string): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'text/xml');
    return this.httpClient.get(url, {
      headers: header
    });
  }

  getText(url: string): Observable<string> {
    return this.httpClient.get(url, { responseType: 'text' });
  }
}
