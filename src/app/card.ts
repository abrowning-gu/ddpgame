export class Card {
    word:string;
    worde:string;
    frontimage:string;
    backimage:string;
    audio:string;
    audioe:string;
   
    constructor(_word:string,_worde:string,_frontimage:string,_backimage:string,_audio:string,_audioe:string){
        this.frontimage = _frontimage;
        this.backimage = _backimage;
        this.word = _word;
        this.worde = _worde;
        this.audio = _audio;
        this.audioe = _audioe;
    }
}
