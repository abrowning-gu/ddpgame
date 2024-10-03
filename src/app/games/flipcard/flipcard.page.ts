import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonMenuButton,IonButton,IonIcon } from '@ionic/angular/standalone';
import { Card } from 'src/app/card';
import { addIcons } from 'ionicons';
import { volumeHighOutline } from 'ionicons/icons';
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
  ftext:string="";
  btext:string = "";
  bimage:string = "";
  fimage:string= "";

  cards:Card[] =[{frontimage:"kuku/animals/adhirran-sawfish.png",backimage:"kuku/animals/adhirran-sawfish.png",fronttext:"Sawfish",backtext:"adhirran"},
    {frontimage:"kuku/animals/agenhung-dingo.png",backimage:"kuku/animals/agenhung-dingo.png",fronttext:"Dingo",backtext:"Apenhung"},
    {frontimage:"kuku/animals/akl-long-neck-turtle.png",backimage:"kuku/animals/akl-long-neck-turtle.png",fronttext:"Long Turtle Neck",backtext:"Akl"},
    {frontimage:"kuku/animals/akyurrya-echidna.png",backimage:"kuku/animals/akyurrya-echidna.png",fronttext:"Echidna",backtext:"Akyurrya"},
  ] 

  currentcard:number = 0;
  prevactive:boolean = true;
  nextactive:boolean = false;
  constructor() {
    addIcons({volumeHighOutline});
   }

  ngOnInit() {
    this.ftext = this.cards[this.currentcard].fronttext;
    this.fimage = this.cards[this.currentcard].frontimage;
    this.btext = this.cards[this.currentcard].backtext;
    this.bimage = this.cards[this.currentcard].backimage;
   
  }
  toggleFlip() {
   
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  
  }
  speak(){
    let texttospeak:string = "";
    if (this.flip == 'inactive'){
      texttospeak = this.ftext;
    }else{
       texttospeak = this.btext;
    }
    var msg = new SpeechSynthesisUtterance(texttospeak);
    (<any>window).speechSynthesis.speak(msg);
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
  }
}
