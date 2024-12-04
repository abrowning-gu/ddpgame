
import { Quizoption } from "./quizoption";
export class Question {
    question:string;
    word:string;
    worde:string;
    image:string;
    audio:string;
    options:Quizoption[];
   

    constructor(_question:string,_word:string,_worde:string,_image:string,
       _audio:string,_options:Quizoption[]){
        this.question = _question;
        this.word = _word;
        this.worde = _worde;
        this.image = _image;
        this.audio = _audio;
        this.options = _options
        
    }
}
