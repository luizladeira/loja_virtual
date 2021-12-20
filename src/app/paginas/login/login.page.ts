import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { UrlService } from '../../provider/url.service';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { ServiceUserService } from '../../provider/service-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(public alert: AlertController, public serviceUrl: UrlService, public http: Http, public nav: NavController, public loading: LoadingController, public serviceUser: ServiceUserService) { 

    this.email = "luizpauloladeira@hotmail.com";
    this.senha = "12345";

    if(localStorage.getItem("deslogado") == 'sim'){
      localStorage.setItem('deslogado','não');
      location.reload();
    }

    if(localStorage.getItem('user_logado') != null){
        console.log('Autenticação');
        this.autenticar();
        this.nav.navigateForward('home');
    }

  }

  ngOnInit() {
  }

  async logar() {

    if (this.email == undefined || this.senha == undefined) {

      this.serviceUrl.alertas('Atenção', 'Preencha todos os campos'); //COLOCA O TITULO E A MENSAGEM

    } else {

      this.serviceUrl.exibirLoading();


      this.http.get(this.serviceUrl.getUrl() + "login.php?email=" + this.email + "&senha=" + this.senha).pipe(map(res => res.json()))
        .subscribe(
          data => {

            if (data.msg.logado == 'sim') {

              if(data.dados.status == 'Ativo'){

                this.serviceUser.setUserId(data.dados.idusuario);
                this.serviceUser.setUserNome(data.dados.nome);
                this.serviceUser.setUserNivel(data.dados.nivel);
                this.serviceUser.setUserFoto(data.dados.foto);

                //SESSÕES ABRE
                localStorage.setItem('idUser',data.dados.idusuario);
                localStorage.setItem('userName',data.dados.nome);
                localStorage.setItem('userNivel',data.dados.nivel);
                localStorage.setItem('userFoto',data.dados.foto);
                //FECHA SESSÃO
                
               

                this.serviceUrl.fecharLoading();
                 //verificar sessão
                 localStorage.setItem('user_logado',data);
                 //fecha verificar sessão
                this.nav.navigateBack('home'); //redireciona para a pagina home
              
              }else{
                
                this.serviceUrl.fecharLoading();//fecha o load 
                this.serviceUrl.alertas('Atenção', 'O Usuário está Bloqueado! Favor entre em contato com o administrador...'); //COLOCA O TITULO E A MENSAGEM
              }


            } else {
              this.serviceUrl.fecharLoading(); //fecha o load 
              this.serviceUrl.alertas('Atenção', 'Usuário ou Senha Incorretos!'); //COLOCA O TITULO E A MENSAGEM

            }
          },
            error => {
                this.serviceUrl.fecharLoading();
                this.serviceUrl.alertas("Atenção!","Algoo deu errado, por favor verifique sua conexão com a internet..");
                
            } 

        );

    }
  }

  autenticar(){
    this.serviceUser.setUserId(localStorage.getItem('idUser'));
    this.serviceUser.setUserNome(localStorage.getItem('userName'));
    this.serviceUser.setUserNivel(localStorage.getItem('userNivel'));
    this.serviceUser.setUserFoto(localStorage.getItem('userFoto'));
  }

}
