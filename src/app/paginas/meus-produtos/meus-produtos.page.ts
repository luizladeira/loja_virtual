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
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.page.html',
  styleUrls: ['./meus-produtos.page.scss'],
})
export class MeusProdutosPage implements OnInit {

  
  produtos: any;
  produtoItem: Array<{codigo:any, nome:any, qtd:any, valor:any, descricao:any, status:any, foto:any, data_registro:any, idUserProduto: any;}>;
  produtoItemTodos: Array<{codigo:any, nome:any, qtd:any, valor:any, descricao:any, status:any, foto:any, data_registro:any,idUserProduto: any;}>;
  detalhe: NavigationExtras;

  constructor(public http: Http, public serviceUrl: UrlService, public nav: NavController, private route: Router, public serviceUser: ServiceUserService, public menuService: MenuService, public dataService: DataService) {
    
    this.listProdutos();
    
      console.log(this.serviceUser.userNome);
      console.log(this.serviceUser.idUser);
      console.log(this.serviceUser.userFoto);
      console.log("USER NIVEL: "+this.serviceUser.userNivel);
      console.log("idUser: "+serviceUser.idUser);
      
   }

  

   listProdutos(){
    this.produtoItem = []; 
    this.serviceUrl.exibirLoading();
    this.http.get(this.serviceUrl.getUrl()+"listDados.php").pipe(map(res => res.json()))
    .subscribe(
      listDados => {
        this.produtos = listDados;

        //percorrer array de produtos
        for(let i = 0; i < listDados.length; i++){

          if(listDados[i].idUser == this.serviceUser.idUser){
            this.produtoItem.push({
              codigo: listDados[i]["codigo"],
              foto: listDados[i]["foto"],
              nome: listDados[i]["nome"],
              qtd: listDados[i]['quantidade'],
              descricao: listDados[i]["descricao"],
              valor: listDados[i]["valor"],
              status: listDados[i]["status"],
              data_registro: listDados[i]["criacao"],
              idUserProduto: listDados[i]["idUser"]
          });
          }

           
        }
       
          this.produtoItemTodos = this.produtoItem;
      },
      error => {
        this.serviceUrl.fecharLoading();
        this.serviceUrl.alertas("Atenção!","Algoo deu errado, não foi possível carregar seus produtos por favor verifique sua conexão com a internet..");
      }
    );

    this.serviceUrl.fecharLoading();

   }

   toProdutos(){
     this.nav.navigateForward('/cadastro-produtos');
   }

   getItems(ev: any) {
   
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      //esse produto.nome ele recebe todos os dados do push que fica dentro do for 
      //e produto.nome ele procura os produtos que possui essa linha
      //portanto agora ele procura pelo nome do produto e descrição

      this.produtoItem = this.produtoItemTodos.filter((produto) => {
        return (
                produto.nome.toLowerCase().indexOf(val.toLowerCase()) > -1
                        ||
                produto.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1
                ); 
      });
    }else{
        this.produtoItem = this.produtoItemTodos;
    }

    }


    doRefresh(event) {
      console.log('Begin async operation');
  
      this.listProdutos();

      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  

    deletar(codigo){
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      return this.http.post( this.serviceUrl.url + "deleteProduto.php", codigo, {
        headers: headers,
        method: "POST"
      }).pipe(map(
        (res: Response) => {return res;}
      ));
   }

   deleteProduto(produto){
    this.deletar(produto.codigo).subscribe(
      data => {
        this.serviceUrl.alertas("Sucesso!","Produto Deletado...");
        console.log("Produto Deletado com Sucesso!");
        this.listProdutos(); //lista produtos 

      }, error =>{
         this.serviceUrl.alertas("Alerta!","Erro ao tentar Deletar..."+error);
          console.log("Erro ao tentar deletar"+error);
      }
    );
   }

  
   editarProduto(produto){

    console.log(produto);

    this.dataService.storange = {
          'codigo': produto.codigo,
          'nome': produto.nome,
          'descricao': produto.descricao,
          'valor': produto.valor,
          'quantidade': produto.qtd,
          'idUserProduto': produto.idUserProduto
    }

    this.nav.navigateForward('/editar-produtos');
     
   }


   adicionarFoto(produto){

    this.dataService.storange = {
      'codigo': produto.codigo,
      'nome': produto.nome,
      'descricao': produto.descricao,
      'valor': produto.valor,
      'quantidade': produto.qtd,
      'idUserProduto': produto.idUserProduto
    }

      this.nav.navigateForward('adicionar-foto');
   }
   

  ngOnInit() {
  }

}
