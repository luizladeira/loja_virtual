import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ServiceUserService } from '../app/provider/service-user.service';
import { UrlService } from '../app/provider/url.service';
import { NavController, NavParams } from '@ionic/angular';
import { MenuService } from '../app/provider/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  flag = false;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public serviceUser: ServiceUserService,
    public serviceUrl: UrlService,
    public nav: NavController,
    public menuService: MenuService,
    private statusBar: StatusBar
  ) {

    if(this.flag != true){
      if(localStorage.getItem("intro") == "sim"){

        if(localStorage.getItem("user_logado") != null){
          this.nav.navigateForward('home');
        }else{
          this.nav.navigateForward('login');
        }
      }
     
  }

  

    this.serviceUser.getUserNome();
    this.serviceUser.getUserFoto();
    this.serviceUser.getUserNivel();
    this.serviceUrl.getUrl();
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleBlackTranslucent();
      
      setTimeout(()=>{
         this.splashScreen.hide();
      },3000);
      
    });
    
  }

  acaoMenu(menu){
    switch(menu){
      
      case "principal":
        this.principal();
        break;

      case "cadastro_usuario":
        this.cadastrarUsuario();
        break;

      case "listar_usuario":
      this.listarUsuario();
      break;
      
      case "cadastro_empresa":
        this.cadastrarEmpresa();
        break;

      case "cadastro_produto":
        this.cadastrarProduto();
        break;

      case "meus_produtos":
         this.meusProdutos();
         break;

         case "adicionar_foto":
           this.adicionarFoto();
           break;

      default:
        break;        
    }
  }

  principal(){
    this.nav.navigateForward('home');
  }

  cadastrarUsuario(){
    this.nav.navigateForward('cadastro-usuarios');
  }

  listarUsuario(){
    this.nav.navigateForward('list-usuarios');
  }

  cadastrarEmpresa(){
    //this.nav.navigateForward('list-usuarios');
  }
  
  meusProdutos(){
    this.nav.navigateForward('meus-produtos');
  }

  cadastrarProduto(){
    this.nav.navigateForward('cadastro-produtos');
  }

  adicionarFoto(){
    this.nav.navigateForward('adicionar-foto');
  }

  deslogar(){
    localStorage.removeItem('user_logado');
    localStorage.setItem('deslogado','sim');
    this.nav.navigateForward('login');
  
    location.reload();
    //localStorage.clear(); //limpa toda a sessão gravada no navegador
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
