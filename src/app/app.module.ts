import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BuildPageComponent } from './build-page/build-page.component';
import { PreviewPaneComponent } from './build-page/preview-pane/preview-pane.component';
import { SurveyPaneComponent } from './build-page/survey-pane/survey-pane.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { AngularFireStorageModule  } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
	NavMenuComponent,
    LoginPageComponent,
    BuildPageComponent,
    PreviewPaneComponent,
    SurveyPaneComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
	AppRoutingModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule
  ],
  providers: [FirebaseService], // , EditUserResolver],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
