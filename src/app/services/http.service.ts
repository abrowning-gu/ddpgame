import { Injectable } from '@angular/core';

import { Question } from '../question';
import { SetInfo } from '../setinfo';
import  {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url="/assets/kuku/kuku.json";
  set="/assets/kuku/setinfo.json";
  quizurl="/assets/kuku/quiz.json";
 // wordlisturl="/assets/kuku/wordlist.json";
  constructor(private http:HttpClient) { }

  getCards(){
    return this.http.get<SetInfo>(this.url);
  }

  getQuiz(){
    return this.http.get<Question[]>(this.quizurl);
  }
 
}
