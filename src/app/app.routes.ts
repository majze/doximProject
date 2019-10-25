import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
//import { NewUserComponent } from './new-user/new-user.component';
//import { EditUserComponent } from './edit-user/edit-user.component';
//import { EditUserResolver } from './edit-user/edit-user.resolver';

export const rootRouterConfig: Routes = [
  //{ path: '', component: HomeComponent },
  { path: '', component: LoginPageComponent } //,
 // { path: 'new-user', component: NewUserComponent },
 // { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver} }
];
