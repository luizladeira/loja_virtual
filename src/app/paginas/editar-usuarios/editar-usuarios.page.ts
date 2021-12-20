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
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.page.html',
  styleUrls: ['./editar-usuarios.page.scss'],
})
export class EditarUsuariosPage implements OnInit {

  editar:any;
  editar1:any;
  codigo: any;
  nome: any;
  email: any;
  foto:any;
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

      
      console.log(this.dataService.storange);
      
      if(this.dataService.storange != undefined ){
        console.log(this.dataService.storange);
        this.preencherDados();
        this.editar = this.formBuilder.group({
          codigo: [this.codigo, Validators.required],
          nome: ['' ,Validators.required],
          email: ['',Validators.required],
          senha_usuario: ['',Validators.required],
          foto:[this.novaFoto,Validators.required],
          nivel: ['',Validators.required],
          idusuario: [this.serviceUser.getUserId(),Validators.required]
  
        });
      }else{
        //console.log('é diferente de vazio');
        //this.serviceUrl.alertas("Atenção!","Algoo deu errado, não foi possível editar seu produto por favor verifique sua conexão com a internet..");
        this.navCtrl.navigateBack('/home');
        
        
      }

    }


    preencherDados(){

      console.log(this.dataService.storange);

       
      if(this.dataService.storange != null){
        this.codigo = this.dataService.storange.codigo;
        this.nome   =  this.dataService.storange.nome;
        this.foto   = this.dataService.storange.foto;
        this.email =  this.dataService.storange.email;
        this.senha_usuario = this.dataService.storange.senha_usuario;
        this.nivel = this.dataService.storange.nivel;
        
      }
      console.log('fto: ');
      console.log(this.foto);
  
      //pronto, tudo certo!
    
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
  
     editarUsuario(){
  
      if(this.nome == undefined || this.email == undefined || this.senha_usuario == undefined || this.nivel == undefined){
          this.serviceUrl.alertas('Atenção!','Preencha todos os campos.');
      }else{
  
        this.editar1 = this.formBuilder.group({
          codigo: [this.codigo, Validators.required],
          nome: [this.nome ,Validators.required],
          email: [this.email,Validators.required],
          senha_usuario: [this.senha_usuario,Validators.required],
          nivel: [this.nivel,Validators.required],
          idusuario: [this.serviceUser.getUserId(),Validators.required],
          foto:[this.novaFoto,Validators.required]
        });

          this.postData(this.editar1.value)
            .subscribe(
                data => {
  
                  this.serviceUrl.alertas('Sucesso!','Dados editado com sucesso..');
                  this.navCtrl.navigateBack('/home');
  
                //  console.log("Inserido com sucesso");
                },
                err => {
                  
                  this.serviceUrl.alertas('Sucesso!','Dados editado com sucesso..');
                  this.navCtrl.navigateBack('/home');
                  //this.serviceUrl.alertas('Erro!','Dados mau inserido tente novamente..');
                  //this.navCtrl.navigateBack('/home');
                 // console.log('Erro ao tentar inserir');
                }
            ); 
  
      }
   }
  
   postData(editar){
    
    if(this.codigo != null){
  
      console.log("O CODIGO É = "+this.codigo);
      console.log("atualizar");
      
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            return this.http.post( this.serviceUrl.url + "editUsuario.php", editar, {
              headers: headers,
              method: "POST"
            }).pipe(map(
              (res: Response) => {return res.json();}
            ));
  
           
          
    }else{
  
      console.log('entrou no senão');
    }
  
   }
  

  ngOnInit() {
  }

}
