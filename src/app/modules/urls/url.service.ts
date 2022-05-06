import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Url, Urls } from './url';
import { UrlDTO } from './url-create/url-create.component';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Urls> {
    return this.httpClient.get<Urls>(`${API}/urls`);
  }

  create(urlDto: UrlDTO) {
    return this.httpClient.post(API + '/urls', urlDto);
  }

  getByUuid(uuid:string) {
    return this.httpClient.get<Url>(`${API}/urls/${uuid}`);
  }
}
