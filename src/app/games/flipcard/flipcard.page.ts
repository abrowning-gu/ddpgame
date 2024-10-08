import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonMenuButton,IonButton,IonIcon } from '@ionic/angular/standalone';
import { Card } from 'src/app/card';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, infinite, volumeHighOutline } from 'ionicons/icons';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-flipcard',
  templateUrl: './flipcard.page.html',
  styleUrls: ['./flipcard.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonMenuButton],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class FlipcardPage implements OnInit {

  flip:string='inactive';
  isword:string="true";
  ftext:string="";
  btext:string = "";
  bimage:string = "";
  fimage:string= "";
  audiofile:string="";
  cards:Card[] = [];
  currentcard:number = 0;
  prevactive:boolean = true;
  nextactive:boolean = false;
  
  constructor(private httpservice: HttpService) {

    addIcons({volumeHighOutline,arrowForward,arrowBack,infinite});
   
    
   }
 
  ngOnInit() {
    //get card data
    this.httpservice.getCards().subscribe(res => {
      
    this.cards = this.shuffleArray(res);
     
    this.ftext = this.cards[this.currentcard].fronttext;
    this.fimage = this.cards[this.currentcard].frontimage;
    this.btext = this.cards[this.currentcard].backtext;
    this.bimage = this.cards[this.currentcard].backimage;
    
    this.audiofile = this.cards[this.currentcard].audio;
      if (this.audiofile == ""){
        this.isword="true";
      }else{
        this.isword="false";
      }
      console.log('flipaudio',this.audiofile);
      console.log(this.isword);
    });
    
   
  }
  shuffleArray(array:any) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
  toggleFlip() {
   
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  
  }
  speak(){
    let texttospeak:string = "";
    if (this.flip == 'inactive'){
      texttospeak = this.ftext;
      let msg = new SpeechSynthesisUtterance(texttospeak);
      let synth=(<any>window).speechSynthesis;
      let voices = synth.getVoices();
     console.log(synth);
      msg.lang = "en-AU";
      msg.rate = 0.75;
      msg.voice = voices[1];
    synth.speak(msg);
    }else{
      let audio = new Audio();
      if (this.audiofile != ""){
        audio.src='../assets/' + this.audiofile;
        audio.load();
        audio.play();
      }
     
    }
    
  }

  next(){
    this.currentcard++;
    if (this.currentcard == this.cards.length-1){
      this.nextactive = true;  
    }
    
    this.setcurrentitem();
    this.prevactive = false;
  }
  previous(){
    this.currentcard--;
    if (this.currentcard == 0){
      this.prevactive = true;
      this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    }
    this.setcurrentitem();
    this.nextactive = false;
  }
  setcurrentitem(){
    if(this.flip=="active"){
      this.flip="inactive";  
    }
    this.ftext = this.cards[this.currentcard].fronttext;
      this.fimage = this.cards[this.currentcard].frontimage;
      this.btext = this.cards[this.currentcard].backtext;
      this.bimage = this.cards[this.currentcard].backimage;
      this.audiofile = this.cards[this.currentcard].audio;
      if (this.audiofile == ""){
        this.isword="true";
      }else{
        this.isword="false";
      }
  }
}
