import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menu = [
    {
      "label": "Principal",
      "icone": "home-outline",
      "acao": "principal", //direcionar url
      "menu": "0", //indice para validação
      'exibirMenu': true
    },
    {
      "label": "Cadastrar Produtos",
      "icone": "cart-outline",
      "acao": "cadastro_produto", //direcionar url
      "menu": "1", //indice para validação
      'exibirMenu': true
    },
    {
      "label": "Meus Produtos",
      "icone": "cart-outline",
      "acao": "meus_produtos", //direcionar url
      "menu": "2", //indice para validação
      'exibirMenu': true
    },
    
    {
      "label": "Cadastrar Usuários",
      "icone": "person-add-outline",
      "acao": "cadastro_usuario", //direcionar url
      "menu": "3", //indice para validação
      'exibirMenu': true
    }, 
    {
      "label": "Listar Usuários",
      "icone": "people-outline",
      "acao": "listar_usuario", //direcionar url
      "menu": "4", //indice para validação
      'exibirMenu': true
    }, 
    {
      "label": "Cadastrar Empresas",
      "icone": "business-outline",
      "acao": "cadastro_empresa", //direcionar url
      "menu": "5", //indice para validação
      'exibirMenu': true
    },
    {
      "label": "Adicionar Foto",
      "icone": "business-outline",
      "acao": "adicionar_foto", //direcionar url
      "menu": "6", //indice para validação
      'exibirMenu': true
    }

    

  ];

  public perfilMenu = [];



  constructor() { }
}
