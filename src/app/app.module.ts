import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
import { EventItemComponent } from './events/event-item/event-item.component';

const appRoutes: Routes = [
  {path: '', component: EventsComponent},
  {path: 'event/:id', component: EventItemComponent},
  {path: 'auth', component: AuthComponent, children: AUTH_ROUTES },

];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    AuthComponent,
    EventItemComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // for debugging only
    ),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
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
