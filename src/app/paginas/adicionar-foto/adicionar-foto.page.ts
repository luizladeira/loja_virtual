import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Validator, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { UrlService } from '../../provider/url.service';
import { ServiceUserService } from '../../provider/service-user.service';
import { DataService } from '../../provider/data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-adicionar-foto',
  templateUrl: './adicionar-foto.page.html',
  styleUrls: ['./adicionar-foto.page.scss'],
})
export class AdicionarFotoPage implements OnInit {


  fotoAtual;
  novaFoto;
  codigo;

  constructor( public http: Http, 
    //public formBuilder: FormBuilder,
    public serviceUrl: UrlService, 
    public navCtrl: NavController,
    public dataService: DataService,
    public serviceUser: ServiceUserService,
    public activedRoute: ActivatedRoute,
    public camera: Camera) {

      console.log('DATA SERVICE: '+this.dataService.storange.codigo);
     
    }


     tirarFoto(){
      const options: CameraOptions = {
        quality: 75,
        destinationType: this.camera.DestinationType.DATA_URL, //data url tras o formato base64 via url
        encodingType: this.camera.EncodingType.JPEG, //define o formato da foto
        mediaType: this.camera.MediaType.PICTURE //de onde iremos pegar a foto se iremos pegar da camera ou da galeria do cel
      }

      this.camera.getPicture(options).then(
        (imageData) => {
          this.serviceUrl.exibirLoading();
          this.novaFoto = 'data:image/jpeg;base64,'+imageData;
          this.serviceUrl.fecharLoading();
        }, error => {
          this.serviceUrl.alertas('Atenção!','Erro ao tentar capturar sua foto');
        }
      );
    }


    buscarFoto(){
      const options: CameraOptions = {
        quality: 70,
        targetHeight: 640,
        targetWidth: 640,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.DATA_URL, //data url tras o formato base64 via url
        //encodingType: this.camera.EncodingType.JPEG, //define o formato da foto
        mediaType: this.camera.MediaType.PICTURE, //de onde iremos pegar a foto se iremos pegar da camera ou da galeria do cel
        allowEdit: true //editar imagem
      }

      this.camera.getPicture(options).then(
        (imageData) => {
          this.serviceUrl.exibirLoading();
          this.novaFoto = 'data:image/jpeg;base64,'+imageData;
          this.serviceUrl.fecharLoading();
        }, error => {
          this.serviceUrl.alertas('Atenção!','Erro ao tentar carregar seu arquivo');
        }
      );
    }

    salvarFoto(){
      this.serviceUrl.exibirLoading();
      let data = {
        foto: this.novaFoto,
        codigo_produto: this.dataService.storange.codigo
      }

      this.http.post(
       /* this.serviceUrl.getUrl()+'uploadePhoto.php', data
        ).pipe(map(res => res.json())).subscribe(data =>{
          console.log(data);
        }); */
        this.serviceUrl.getUrl()+'uploadePhoto.php', data
        ).pipe().subscribe(data =>{

          if(data.status == 200){
            this.serviceUrl.fecharLoading();
              this.serviceUrl.alertas('Sucesso!','Sua foto foi inserida com sucesso..');
              this.navCtrl.navigateBack('/home');
          }else{
            this.serviceUrl.fecharLoading();
            this.serviceUrl.alertas('Erro!','Sua foto foi mal inserida tente novamente, caso o erro persista entre em contato com o desenvolvedor..');
            this.navCtrl.navigateBack('/home');
          }

          },error => {
            this.serviceUrl.fecharLoading();
            this.serviceUrl.alertas('Opss!','Algo deu errado favor entre em contato com o desenvolvedor..');
            this.navCtrl.navigateBack('/home');
         
        });
    }


  ngOnInit() {
  }


  
}
