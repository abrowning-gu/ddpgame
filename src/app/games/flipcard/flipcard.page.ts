import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonMenuButton,IonButton,IonIcon } from '@ionic/angular/standalone';
import { Card } from 'src/app/card';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, infinite, volumeHighOutline } from 'ionicons/icons';
import { HttpService } from 'src/app/services/http.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SetInfo } from 'src/app/setinfo';

@Component({
  selector: 'app-flipcard',
  templateUrl: './flipcard.page.html',
  styleUrls: ['./flipcard.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, IonIcon, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonMenuButton],
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
  isword:boolean= false;
  ftext:string="";
  btext:string = "";
  bimage:string = "";
  fimage:string= "";
  audiofile:string="";
  cards:Card[] = [];
  cardcount = 0;
  setinfo:SetInfo = {"lang":"","location":"","credits":"","words":[]};
  currentcard:number = 0;
  prevactive:boolean = true;
  nextactive:boolean = false;
  card:Card= new Card("","","","","","");

  
  constructor(private httpservice: HttpService,private utils: UtilsService) {

    addIcons({volumeHighOutline,arrowForward,arrowBack,infinite});
   
    
   }
 
  ngOnInit() {
    //get card data
  
    this.httpservice.getCards().subscribe(res => {
    this.setinfo = res; 
    this.cards = this.utils.shuffleArray(this.setinfo.words);
    this.cardcount = this.cards.length;
   
    this.card = this.cards[this.currentcard];
      //check if a audiofile exists else diable the button  
   // this.isword = this.utils.isAudioexist(this.card.audio);
      
    });
    
   
  }
 
  
  toggleFlip() {
   
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  
  }
  speak(){
    let texttospeak:string = "";
    if (this.flip == 'inactive'){
      texttospeak = this.cards[this.currentcard].worde;
      let msg = new SpeechSynthesisUtterance(texttospeak);
      let synth=(<any>window).speechSynthesis;
      let voices = synth.getVoices();
     //console.log(synth);
      msg.lang = "en-AU";
      msg.rate = 0.75;
      msg.voice = voices[1];
    synth.speak(msg);
    }else{
      let audio = new Audio();
      if (this.cards[this.currentcard].audio != ""){
        audio.src='../assets/' + this.cards[this.currentcard].audio;
        audio.load();
        audio.play();
      }
     
    }
    
  }

  next(){
   
    this.currentcard++;
    
    if (this.currentcard >= this.cardcount-1){
      this.nextactive = true;  
    }
    
    this.setcurrentitem();
    this.prevactive = false;
    
  }
  previous(){
   
    this.currentcard--;
    if (this.currentcard <= 0){
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
   
    this.card = this.cards[this.currentcard];
     
      this.isword = this.utils.isAudioexist(this.card.audio);
  }
 
}
