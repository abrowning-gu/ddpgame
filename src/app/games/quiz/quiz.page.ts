import { Component, OnInit} from '@angular/core';
import { CommonModule,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IonPopover,IonRadioGroup,IonRadio,IonList,IonItem,IonCheckbox,IonContent,IonButton,IonIcon } from '@ionic/angular/standalone';
import { Question } from 'src/app/question';
import { Quiz } from 'src/app/quiz';
import { Quizoption } from 'src/app/quizoption';
import { Card } from 'src/app/card';
import { SetInfo } from 'src/app/setinfo';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, infinite, server, volumeHighOutline } from 'ionicons/icons';
import { HttpService } from 'src/app/services/http.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [NgFor,FormsModule,IonPopover,IonRadioGroup,IonRadio,IonList,IonItem,IonCheckbox,IonContent, RouterLink, IonIcon, IonButton],
 
})
export class QuizPage implements OnInit {
  flip:string='inactive';
  isword:boolean= false;
  ftext:string="";
  btext:string = "";
  bimage:string = "";
  fimage:string= "";
  audiofile:string="";
  quiz:Quiz[] = [];
  cards:Card[]=[];
  setinfo:SetInfo = {"lang":"","location":"","credits":"","words":[]};
  question:Question = new Question("","","","","",[]);
  currentquestion:number = 0;
  prevactive:boolean = true;
  nextactive:boolean = false;
  options:Quizoption[] = [];
  isPopovertrueOpen:boolean = false;
  isPopoverfalseOpen:boolean = false;
  radval = "";
  wordexists = false;
  constructor(private httpservice: HttpService,private utils: UtilsService) {

    addIcons({volumeHighOutline,arrowForward,arrowBack,infinite});
   
    
   }

  ngOnInit() {
    this.httpservice.getCards().subscribe(res => {
      
      this.setinfo = res;
      this.cards = this.setinfo.words;
      this.httpservice.getQuiz().subscribe(result => {
        this.quiz = this.utils.shuffleArray(result);
        this.configureQuestion();
      
      })
    });
    
  }
  toggleFlip() {
   
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  
  }
  speak(audiofile:string){
   
      let audio = new Audio();
      if (audiofile != ""){
        audio.src='../assets/' + audiofile;
        audio.load();
        audio.play();
      }
     
    
    
  }

  next(){
    this.isPopovertrueOpen = false;
    this.isPopoverfalseOpen = false;
    this.currentquestion++;
    if (this.currentquestion == this.quiz.length-1){
      this.nextactive = true;  
    }
    this.configureQuestion();
    this.prevactive = false;
  }
  previous(){
    this.isPopovertrueOpen = false;
    this.isPopoverfalseOpen = false;
    this.currentquestion--;
    if (this.currentquestion == 0){
      this.prevactive = true;
      //this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    }
  
    this.configureQuestion();
    this.nextactive = false;
  }
 clearpopover(){
    this.isPopovertrueOpen = false;
    this.isPopoverfalseOpen = false;
 }
  itemSelected(event:any){
  //console.log(event.detail.value, this.question.word)
 
    if (event.detail.value == this.question.word){  
      //console.log("Open Popup correct");   
      this.isPopovertrueOpen = true;
      let audio = new Audio();
     //get a sound to play for congratulations
        audio.src='../assets/audio/clapping.mp3';
        audio.load();
        audio.play();
      
     
    }else{
      console.log("Open Popup incorrect");  
      this.isPopoverfalseOpen = true;
      
    }

  }
  configureQuestion(){
    this.options = [];
    for(let i=0; i<=this.cards.length-1;i++){
      //loop to find details for the question word.
     
      if (this.cards[i].word == this.quiz[this.currentquestion].word)
      {
        let wordcount = 0
        //find three other random words that do no include the question word
        while (wordcount < 3){
          //pick a random number
          let rnd = Math.floor(Math.random()*this.cards.length);
          
          //make sure the new random word is not the same as the question word
          if (this.cards[rnd].word != this.quiz[this.currentquestion].word){
            
           this.wordexists = false;
            //check for already being in the list
            for(let i=0;i<this.options.length;i++){
              if(this.options[i].word == this.cards[rnd].word){
                //add words to options array.
                this.wordexists = true;
                
              }
            }
              if (!this.wordexists){
                this.options.push({"word":this.cards[rnd].word,"audio":this.cards[rnd].audio });
                wordcount++;
              }
            
          }
       }
       //randomly add in the question word to the array.
       this.options.splice(Math.floor( Math.random() * this.options.length),0,{"word":this.cards[i].word,"audio":this.cards[i].audio });
       //create a new question
       
        this.question = new Question(this.quiz[this.currentquestion].question,
            this.quiz[this.currentquestion].word,
            this.cards[i].worde,
            this.cards[i].frontimage,
            this.cards[i].audio,
            this.options
        );
       break;
      }
    }
    
  }

 
}
