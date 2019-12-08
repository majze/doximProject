import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BuildPageComponent } from './build-page/build-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    },
    {
        path: 'build',
        component: BuildPageComponent
    },
    {
        path: 'admin',
        component: AdminPageComponent
    },
    // otherwise redirect to login
    {
        path: '**', redirectTo: ''
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
