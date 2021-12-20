import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

      url:string = "http://luizladeira.com/curso_ionic4/php/";
    //url:string = "http://localhost/curso_ionic4/curso_ionic4/php/";

    loading = false;

  constructor(public alert: AlertController, public loadingControl: LoadingController) { }

  getUrl(){
    return this.url;
  }

  async alertas(titulo, msg){
    const alert = await this.alert.create({

      header: titulo,
      message: msg,

      buttons:[
        'Ok'
      ]
    });
    await alert.present();
  }

  async exibirLoading(){
    
    this.loading = true

    return await this.loadingControl.create({
      message: "Aguarde um momento..."
    }).then(a => {
      a.present().then(() => {
        if(!this.loading){
          a.dismiss().then(() => {

          });
        }
      });
    });
  }

async fecharLoading(){
  this.loading = false;
  return await this.loadingControl.dismiss().then(() => {});
}


}
