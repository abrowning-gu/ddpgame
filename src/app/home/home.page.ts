import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Card } from 'src/app/card';
import { HttpService } from 'src/app/services/http.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SetInfo } from 'src/app/setinfo';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, RouterLink,IonContent,  CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  cards:Card[] = [];
  setinfo:SetInfo = {"lang":"","location":"","credits":"","words":[]};
  cardcount = 0;
  card:Card= new Card("","","","","","");
  currentcard:number = 0;
  constructor(private httpservice: HttpService,private utils: UtilsService) { }

  ngOnInit() {
    //get card data
  
    this.httpservice.getCards().subscribe(res => {
    this.setinfo = res; 
    // this.cards = this.utils.shuffleArray(this.setinfo.words);
    // this.cardcount = this.cards.length;
   
    // this.card = this.cards[this.currentcard];
   
      
    });
    
   
  }

}
