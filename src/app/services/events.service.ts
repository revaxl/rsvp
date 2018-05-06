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
      .map(response => {
        console.log(response.json());
        // this.events = response.json().obj;
        return response.json() })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getEvent(id: string) {
    return this.http.get('/events/'+ id)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addEvent(event: Event) {
    console.log(event);
    const headers = new Headers({"Content-Type": "application/json"});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('/events' + token, JSON.stringify(event), {headers: headers})
      .map(response => { return response.json(); })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteEvent(event: Event) {
    this.events.splice(this.events.indexOf(event), 1);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    this.http.delete(`/events/${event.id.toString()}` + token)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  joinEvent(eventid: string) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get(`/events/${eventid}/join` + token)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

}
