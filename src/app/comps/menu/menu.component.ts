import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {  IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel,  IonRouterLink } from '@ionic/angular/standalone';
import { cardOutline,cardSharp,trashOutline,trashSharp,warningOutline,warningSharp} from 'ionicons/icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone:true,
  imports:[CommonModule,IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel,  IonRouterLink,RouterLink]
})
export class MenuComponent  implements OnInit {

  constructor() {
    addIcons({ cardOutline,cardSharp,trashOutline, trashSharp, warningOutline, warningSharp});
   }
  public appPages = [ { title: 'Home', url: '/home', icon: 'card' },
    { title: 'Flip Card', url: '/games/flipcard', icon: 'card' },
    { title: 'Quiz', url: '/quiz', icon: 'card' },
   
   
  ];
  ngOnInit() {}

}
