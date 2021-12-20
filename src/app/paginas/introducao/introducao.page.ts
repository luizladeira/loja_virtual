import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-introducao',
  templateUrl: './introducao.page.html',
  styleUrls: ['./introducao.page.scss'],
})
export class IntroducaoPage implements OnInit {

 

  constructor(public nav: NavController) {

   

   }

  ngOnInit() {
  }

  toIntro(){
    localStorage.setItem("intro","sim");
    this.nav.navigateForward('login');
  }

}
