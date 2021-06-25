import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { CompanyComponent } from './pages/company/company.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { TravelMapComponent } from './pages/travel-map/travel-map.component';
import { UserComponent } from './pages/user/user.component';
import { DestinyComponent } from './pages/destiny/destiny.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes =[
  {
    path: 'login',
    component:LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [//children significa que terá rotas filhas dentro da pagina
      { pathMatch: 'full', path: 'company', component: CompanyComponent },
      { pathMatch: 'full', path: 'categorias', component: CategoriasComponent },
      { pathMatch: 'full', path: 'destiny', component: DestinyComponent },
      { pathMatch: 'full', path: 'travelMap', component: TravelMapComponent },
      { pathMatch: 'full', path: 'user', component: UserComponent },
      ],
    canActivate: [ AuthGuard ]} 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
