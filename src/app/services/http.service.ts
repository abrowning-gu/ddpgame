import { Injectable } from '@angular/core';
import { Card } from '../card';
import { Question } from '../question';
import  {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url="/assets/kuku/kuku.json";
  quizurl="/assets/kuku/quiz.json";
  wordlisturl="/assets/kuku/wordlist.json";
  constructor(private http:HttpClient) { }

  getCards(){
    return this.http.get<Card[]>(this.url);
  }
  getQuiz(){
    return this.http.get<Question[]>(this.quizurl);
  }
 
}
