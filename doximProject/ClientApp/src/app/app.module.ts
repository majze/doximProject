import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { HomeComponent } from './components/home/home.component';
import { AppSurveyComponent } from './components/app-survey/app-survey.component';
import { AppPreviewComponent } from './components/app-preview/app-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppLoginComponent,
    AppNavComponent,
    AppSurveyComponent,
    AppPreviewComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppLoginComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
