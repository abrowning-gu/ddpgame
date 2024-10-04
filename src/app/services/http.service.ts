import { Injectable } from '@angular/core';
import { Card } from '../card';
import  {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url="/assets/kuku.json";
  constructor(private http:HttpClient) { }

  getCards(){
    return this.http.get<Card[]>(this.url);
  }
}
