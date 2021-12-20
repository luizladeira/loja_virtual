import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {

  idUser: "";
  userNome: "";
  userNivel: any;
  userFoto: "";
  foto = "";

  constructor() { }

  setUserId(valor){
    this.idUser = valor;
  }

  getUserId(){
    return this.idUser;
  }

  setUserNome(valor){
    this.userNome = valor;
  }

  getUserNome(){
    return this.userNome;
  }

  setUserNivel(valor){
    this.userNivel = valor;
  }

  getUserNivel(){
    return this.userNivel;
  }
  
  setUserFoto(valor){
    this.userFoto = valor;
  }

  getUserFoto(){
    return this.userFoto;
  }



}
