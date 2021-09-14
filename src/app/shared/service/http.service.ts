import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getData(url: string) {
    let header = new HttpHeaders();
    header = header.append('Content-Type' , 'text/xml');
    return this.httpClient.get(url , {
      headers: header
    });
  }
}
