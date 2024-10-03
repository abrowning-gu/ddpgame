import { Component, OnInit,ElementRef, Renderer2,ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonMenuButton } from '@ionic/angular/standalone';
import sketch from './sketch';
import * as p5  from 'p5';

@Component({
  selector: 'app-tilegame',
  templateUrl: './tilegame.page.html',
  styleUrls: ['./tilegame.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonMenuButton]
})
export class TilegamePage implements OnInit {
  constructor(private el: ElementRef,
    private renderer: Renderer2) { }
    p5!:p5;
    @ViewChild('sketch') sketch!: ElementRef;
    
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.p5 = new p5(sketch, this.sketch.nativeElement);
  }
}
