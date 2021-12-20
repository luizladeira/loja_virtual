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
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.page.html',
  styleUrls: ['./cadastro-usuarios.page.scss'],
})
export class CadastroUsuariosPage implements OnInit {
  criar:any;
  criar1:any;
  codigo: any;
  nome: any;
  email: any;
  senha_usuario: any;
  nivel: any;
  fotoAtual;
  novaFoto;
  

  constructor(
    public http: Http, 
    public formBuilder: FormBuilder,
    public serviceUrl: UrlService, 
    public navCtrl: NavController,
    public dataService: DataService,
    public serviceUser: ServiceUserService,
    public activedRoute: ActivatedRoute,
    public camera: Camera
    
    ) {

      this.criar = this.formBuilder.group({
        codigo: [this.codigo, Validators.required],
        nome: ['' ,Validators.required],
        email: ['',Validators.required],
        senha_usuario: ['',Validators.required],
        nivel: ['',Validators.required],
        idusuario: [this.serviceUser.getUserId(),Validators.required],
        foto: [this.novaFoto,Validators.required],
      });
      

    }

    /* FOTOS */
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

    /* FECHA FOTOS */
    

  criarUsuario(){
    if(this.nome == undefined || this.email == undefined || this.senha_usuario == undefined ||  this.nivel == undefined){
      console.log('NOME: '+this.nome);  
      console.log('EMAIL: '+this.email); 
      console.log('SENHA: '+this.senha_usuario); 
      console.log('NIVEL: '+this.nivel); 
    
      this.serviceUrl.alertas('Atenção!','Preencha todos os campos.');
        
    }else{
      this.criar1 = this.formBuilder.group({
        codigo: [this.codigo, Validators.required],
        nome: [this.nome ,Validators.required],
        email: [this.email,Validators.required],
        senha_usuario: [this.senha_usuario,Validators.required],
        nivel: [this.nivel,Validators.required],
        idusuario: [this.serviceUser.getUserId(),Validators.required],
        foto:[this.novaFoto,Validators.required]
      });
    
        this.postData(this.criar1.value)
          .subscribe(

              data => {

                this.serviceUrl.fecharLoading();
                this.serviceUrl.alertas('Sucesso!','Sua foto foi inserida com sucesso..');
                this.navCtrl.navigateBack('/home');

              //  this.serviceUrl.alertas('Sucesso!','Dados inserido com sucesso..');
                //this.navCtrl.navigateBack('/home');

               // console.log("Inserido com sucesso");
              },
              err => {

                this.serviceUrl.fecharLoading();
                this.serviceUrl.alertas('Sucesso!','Sua foto foi inserida com sucesso..');
                this.navCtrl.navigateBack('/home');


               // this.serviceUrl.alertas('Sucesso!','Dados inserido com sucesso..');
               // this.navCtrl.navigateBack('/home');
                
                  //this.serviceUrl.alertas('Erro!','Dados mal inserido por favor tente novamente... com sucesso..');
                  //this.navCtrl.navigateBack('/home');
                  //console.log('Erro ao tentar inserir');
              }
          ); 
          

    }
  }

  postData(criar){
    console.log('array de criar: ');
    console.log(criar);
    //console.log(criar,this.novaFoto);
    
    this.serviceUrl.exibirLoading();
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post( this.serviceUrl.url + "insertUsuario.php", criar, {
      headers: headers,
      method: "POST",
    }).pipe(map(
      (res: Response) => {return res.json();}
    ));
  

 }

  ngOnInit() {
  }

}
