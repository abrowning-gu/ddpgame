import { Card } from 'src/app/card';
export class SetInfo {
    lang:string;
    location:string;
    credits:string;
    words:Card[] = [];
   
    
    
   
    constructor(_lang:string,_location:string,_credits:string,_words:Card[]){
        this.lang = _lang;
        this.location = _location;
        this.credits = _credits;
        this.words = _words;
       
    }
}
