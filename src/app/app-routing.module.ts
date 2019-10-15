import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BuildPageComponent } from './build-page/build-page.component';
import { PreviewPaneComponent } from './build-page/preview-pane/preview-pane.component';
import { SurveyPaneComponent } from './build-page/survey-pane/survey-pane.component';

const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    },
    {
        path: 'build',
        component: BuildPageComponent
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
