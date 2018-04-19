import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AuthService } from './services/auth.service';
import { EventsService } from './services/events.service';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import { AuthComponent } from './auth/auth.component';

import { AUTH_ROUTES } from "./auth/auth.routing";
import { AuthModule } from './auth/auth.module';

const appRoutes: Routes = [
  {path: '', component: EventsComponent},
  {path: 'auth', component: AuthComponent, children: AUTH_ROUTES },

];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    AuthComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // for debugging only
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AuthModule
  ],
  providers: [AuthService, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
