import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WordlistComponent } from './wordlist/contextpacks/wordlist.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'wordlists', component: WordlistComponent},
  {path: 'wordlists/:id', component: WordlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
