import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'introducao',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'list-produtos',
    loadChildren: () => import('./paginas/list-produtos/list-produtos.module').then( m => m.ListProdutosPageModule)
  },
  {
    path: 'list-usuarios',
    loadChildren: () => import('./paginas/list-usuarios/list-usuarios.module').then( m => m.ListUsuariosPageModule)
  },
  {
    path: 'cadastro-produtos',
    loadChildren: () => import('./paginas/cadastro-produtos/cadastro-produtos.module').then( m => m.CadastroProdutosPageModule)
  },
  {
    path: 'cadastro-usuarios',
    loadChildren: () => import('./paginas/cadastro-usuarios/cadastro-usuarios.module').then( m => m.CadastroUsuariosPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'introducao',
    loadChildren: () => import('./paginas/introducao/introducao.module').then( m => m.IntroducaoPageModule)
  },
  {
    path: 'editar-produtos',
    loadChildren: () => import('./paginas/editar-produtos/editar-produtos.module').then( m => m.EditarProdutosPageModule)
  },
  {
    path: 'meus-produtos',
    loadChildren: () => import('./paginas/meus-produtos/meus-produtos.module').then( m => m.MeusProdutosPageModule)
  },
  {
    path: 'adicionar-foto',
    loadChildren: () => import('./paginas/adicionar-foto/adicionar-foto.module').then( m => m.AdicionarFotoPageModule)
  },
  {
    path: 'editar-usuarios',
    loadChildren: () => import('./paginas/editar-usuarios/editar-usuarios.module').then( m => m.EditarUsuariosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
