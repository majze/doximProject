import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { HomeComponent } from './components/home/home.component';
import { AppSurveyComponent } from './components/app-survey/app-survey.component';
import { AppPreviewComponent } from './components/app-preview/app-preview.component';

const routes: Routes = [
    {
        path: '',
        component: AppLoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'survey',
        component: AppSurveyComponent
    },
    {
        path: 'preview',
        component: AppPreviewComponent
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
