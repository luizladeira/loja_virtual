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
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.page.html',
  styleUrls: ['./list-usuarios.page.scss'],
})
export class ListUsuariosPage implements OnInit {

  usuarios: any;
  usuarioItem: Array<{codigo:any, nome:any, email:any, senha_usuario:any, foto:any, nivel:any, status:any, criacao:any, empresa:any}>;
  usuarioItemTodos: Array<{codigo:any, nome:any, email:any, senha_usuario:any, foto:any, nivel:any, status:any, criacao:any, empresa:any}>;
  detalhe: NavigationExtras;

  constructor(public http: Http, 
    public serviceUrl: UrlService, 
    public nav: NavController, 
    public route: Router, 
    public serviceUser: ServiceUserService, 
    public menuService: MenuService, 
    public dataService: DataService) {
      
     
      
      console.log(this.serviceUser.userNome);
      console.log(this.serviceUser.idUser);
      console.log(this.serviceUser.userFoto);
      console.log("USER NIVEL: "+this.serviceUser.userNivel);
      console.log("idUser: "+serviceUser.idUser);

      this.listUsuarios();
      
    }

    listUsuarios(){
      this.usuarioItem = []; 
      this.serviceUrl.exibirLoading();
      this.http.get(this.serviceUrl.getUrl()+"listDadosUsuarios.php").pipe(map(res => res.json()))
      .subscribe(
        listDadosUser => {
          this.usuarios = listDadosUser;
          
          //percorrer array de usuarios
          for(let i = 0; i < listDadosUser.length; i++){
  
               this.usuarioItem.push({

                codigo:       listDadosUser[i]["codigo"],
                nome:         listDadosUser[i]["nome"],
                email:        listDadosUser[i]["email"],
                senha_usuario:  listDadosUser[i]["senha"], 
                foto:         listDadosUser[i]["foto"],
                nivel:        listDadosUser[i]["nivel"],
                status:       listDadosUser[i]["status"],
                empresa:      listDadosUser[i]["empresa"],
                criacao:      listDadosUser[i]["criacao"]
                
            });
        
          }
         
            this.usuarioItemTodos = this.usuarioItem;
            console.log(this.usuarioItemTodos );
        },
        error => {
          this.serviceUrl.fecharLoading();
          this.serviceUrl.alertas("Atenção!","Algoo deu errado, não foi possível carregar seus produtos por favor verifique sua conexão com a internet..");
        }
      );
  
      this.serviceUrl.fecharLoading();
    }

    toUsuarios(){
      this.nav.navigateForward('/cadastro-usuarios');
    }


    getItems(ev: any) {
   
      const val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
  
        //esse produto.nome ele recebe todos os dados do push que fica dentro do for 
        //e produto.nome ele procura os produtos que possui essa linha
        //portanto agora ele procura pelo nome do produto e descrição
  
        this.usuarioItem = this.usuarioItemTodos.filter((usuario) => {
          return (
            usuario.nome.toLowerCase().indexOf(val.toLowerCase()) > -1
                          ||
                          usuario.email.toLowerCase().indexOf(val.toLowerCase()) > -1
                  ); 
        });
      }else{
          this.usuarioItem = this.usuarioItemTodos;
      }
  
      }

      doRefresh(event) {
        console.log('Begin async operation');
    
        this.listUsuarios();
  
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 2000);
      }


     deletar(codigo){
       console.log(codigo);
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.post( this.serviceUrl.url + "deleteUsuario.php", codigo, {
          headers: headers,
          method: "POST"
        }).pipe(map(
          (res: Response) => {return res;}
        ));
     }
  
     deleteUsuario(usuario){
       console.log(usuario);
      this.deletar(usuario.codigo).subscribe(
        data => {
          this.serviceUrl.alertas("Sucesso!","Usuário Deletado...");
          console.log("Usuário Deletado com Sucesso!");
          this.listUsuarios(); //lista produtos 
  
        }, error =>{
           this.serviceUrl.alertas("Alerta!","Erro ao tentar Deletar..."+error);
            console.log("Erro ao tentar deletar"+error);
        }
      );
     }



      editarUsuario(usuario){

        console.log(usuario);
    
        this.dataService.storange = {
          'codigo': usuario.codigo,
          'nome' : usuario.nome,
          'foto': usuario.foto,
          'email' : usuario.email,
          'senha_usuario' : usuario.senha_usuario,
          'nivel' : usuario.nivel
        }
        this.nav.navigateForward('/editar-usuarios');
    
       }
  

  ngOnInit() {
  }

}
