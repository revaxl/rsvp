import { Injectable } from '@angular/core';
import {Event} from "../models/events";
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  constructor(private http: Http) {}

  getEvents() {
    return this.http.get('/events')
      .map((response) => {
       for (var event of response.json().obj) {
          console.log(event);
        };
        return response.json()})
      .catch(error => Observable.throw(error.json()));
  }

  addEvent(event: Event) {
    console.log(event);
    const headers = new Headers({"Content-Type": "application/json"});
    return this.http.post('/events', JSON.stringify(event), {headers: headers})
      .map(response => console.log(response))
      .catch(err => Observable.throw(err.json()));
  }
}
