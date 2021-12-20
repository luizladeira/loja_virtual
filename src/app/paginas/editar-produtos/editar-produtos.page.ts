import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Validator, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { UrlService } from '../../provider/url.service';
import { ServiceUserService } from '../../provider/service-user.service';
import { DataService } from '../../provider/data.service';


@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.page.html',
  styleUrls: ['./editar-produtos.page.scss'],
})
export class EditarProdutosPage implements OnInit {

  editar:any;
  codigo: any;
  nome: any;
  descricao: any;
  valor: any;
  qtd: any;
  idUsuario: any; //any qualquer tipo de dado
  idUserProduto: any;
  

  constructor(
    public http: Http, 
    public formBuilder: FormBuilder,
    public serviceUrl: UrlService, 
    public navCtrl: NavController,
    public dataService: DataService,
    public serviceUser: ServiceUserService,
    private activedRoute: ActivatedRoute
   
    ) {
     
      console.log('teste');
      console.log(this.dataService.storange);
      
      if(this.dataService.storange != undefined ){
        console.log(this.dataService.storange);
        this.preencherDados();
        this.editar = this.formBuilder.group({
          codigo: [this.codigo, Validators.required],
          nome: ['' ,Validators.required],
          descricao: ['',Validators.required],
          valor: ['',Validators.required],
          qtd: ['',Validators.required],
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
      this.descricao =  this.dataService.storange.descricao;
      this.valor = this.dataService.storange.valor;
      this.qtd = this.dataService.storange.quantidade;
    }

    //pronto, tudo certo!
  
   }

   editarProduto(){

    if(this.nome == undefined || this.descricao == undefined || this.valor == undefined || this.qtd == undefined){
        this.serviceUrl.alertas('Atenção!','Preencha todos os campos.');
    }else{

        this.postData(this.editar.value)
          .subscribe(
              data => {

                this.serviceUrl.alertas('Sucesso!','Dados editado com sucesso..');
                this.navCtrl.navigateBack('/home');

              //  console.log("Inserido com sucesso");
              },
              err => {

                this.serviceUrl.alertas('Erro!','Dados mau inserido tente novamente..');
                this.navCtrl.navigateBack('/home');
               // console.log('Erro ao tentar inserir');
              }
          ); 

    }
 }

 postData(editar){
  
  //console.log("O CODIGO É = "+this.codigo);
  //console.log("O CODIGO É = "+criar);

  if(this.codigo != null){

    console.log("O CODIGO É = "+this.codigo);
    console.log("atualizar");
    
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
          return this.http.post( this.serviceUrl.url + "editProduto.php", editar, {
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
