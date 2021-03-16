import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContextPackListComponent } from './wordlist/contextpacks/contextpack-list.component';
import { ContextPackInfoComponent } from './wordlist/contextpacks/contextpack-info.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'wordlists', component: ContextPackListComponent},
  {path: 'wordlists/:id', component: ContextPackInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
