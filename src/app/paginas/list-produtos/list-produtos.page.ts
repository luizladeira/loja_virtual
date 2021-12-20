import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Validator, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';

import { map } from 'rxjs/operators';
import { UrlService } from '../../provider/url.service';
import { ServiceUserService } from '../../provider/service-user.service';
import { MenuService } from '../../provider/menu.service';
import { DataService } from '../../provider/data.service';


@Component({
  selector: 'app-list-produtos',
  templateUrl: './list-produtos.page.html',
  styleUrls: ['./list-produtos.page.scss'],
})
export class ListProdutosPage implements OnInit {

  id: any; //pegar o id
  detalhes: any; //pegar os detalhes
  dados: Array<{codigo: any, nome: any, foto:any, descricao: any, valor: any}>;
  teste: any;
  produto:any;
  
  constructor(
    public http: Http, 
    public serviceUrl: UrlService, 
    public nav: NavController, 
    public route: Router, 
    public serviceUser: ServiceUserService, 
    public menuService: MenuService, 
    public dataService: DataService
  ) { 
   
    this.id = this.dataService.storange.codigo;
    if(this.id){
      this.listDetalhe();
    }else{
      console.log("ID VAZIO");
    }
    this.dados = [];
   

  }

  listDetalhe(){
    
   this.teste = this.http.get(this.serviceUrl.getUrl() + "detalhesProdutos.php?idproduto=" + this.id).pipe(map(res => res.json()))
    .subscribe(
        data => {
          this.detalhes = data;
          
          for(let i = 0; i < data.length; i++){

            this.dados.push({
              codigo:      data[i]["codigo"],
              nome:        data[i]["nome"],
              foto:        data[i]["foto"],
              descricao:   data[i]["descricao"],
              valor:       data[i]["valor"]              
            });

          }

          console.log(this.dados[0].nome);
          console.log("TESTE: "+this.detalhes[0].valor);
          
        }
       
    );
  }



  ngOnInit() {
  }

  

}
