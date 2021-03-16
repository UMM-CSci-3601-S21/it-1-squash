import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { AddUserComponent } from './users/add-user.component';
import { ContextPackListComponent } from './wordlist/contextpacks/contextpack-list.component';
import { ContextPackInfoComponent } from './wordlist/contextpacks/contextpack-info.component';
import { ContextPackCardComponent } from './wordlist/contextpacks/contextpack-card.component';
import { WordlistCardComponent } from './wordlist/wordlists/wordlist-card.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/new', component: AddUserComponent},
  {path: 'users/:id', component: UserProfileComponent},
  {path: 'wordlists', component: ContextPackListComponent},
  {path: 'wordlists/:id', component: ContextPackInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
