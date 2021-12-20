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
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.page.html',
  styleUrls: ['./cadastro-produtos.page.scss'],
})
export class CadastroProdutosPage implements OnInit {

  criar:any;
  codigo: any;
  nome: any;
  descricao: any;
  valor: any;
  qtd: any;
  idusuario: any; //any qualquer tipo de dado
  

  constructor(
    public http: Http, 
    public formBuilder: FormBuilder,
    public serviceUrl: UrlService, 
    public navCtrl: NavController,
    public dataService: DataService,
    public serviceUser: ServiceUserService,
    public activedRoute: ActivatedRoute
    ) {

     
      this.criar = this.formBuilder.group({
        codigo: [this.codigo, Validators.required],
        nome: ['' ,Validators.required],
        descricao: ['',Validators.required],
        valor: ['',Validators.required],
        qtd: ['',Validators.required],
        idusuario: [this.serviceUser.getUserId(),Validators.required]

      });
   }

  
   

   criarProduto(){

      if(this.nome == undefined || this.descricao == undefined || this.valor == undefined || this.qtd == undefined){
        console.log('NOME PRODUTO: '+this.nome);  
        console.log('DESC PRODUTO: '+this.descricao); 
        console.log('VALOR PRODUTO: '+this.valor); 
        console.log('QTD PRODUTO: '+this.qtd); 
        this.serviceUrl.alertas('Atenção!','Preencha todos os campos.');
          
      }else{

          this.postData(this.criar.value)
            .subscribe(
                data => {

                  this.serviceUrl.alertas('Sucesso!','Dados inserido com sucesso..');
                  this.navCtrl.navigateBack('/home');

                 // console.log("Inserido com sucesso");
                },
                err => {
                  this.serviceUrl.alertas('Sucesso!','Dados inserido com sucesso..');
                  this.navCtrl.navigateBack('/home');
                  //this.serviceUrl.alertas('Erro!','Dados mal inserido por favor tente novamente... com sucesso..');
                   // this.navCtrl.navigateBack('/home');
                   // console.log('Erro ao tentar inserir');
                }
            ); 

      }
   }

   postData(criar){
    
    
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      return this.http.post( this.serviceUrl.url + "insertProduto.php", criar, {
        headers: headers,
        method: "POST"
      }).pipe(map(
        (res: Response) => {return res.json();}
      ));
    

   }


   

  ngOnInit() {
  }

}
