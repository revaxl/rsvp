import { Component, OnInit } from '@angular/core';
import {EventsService} from "../services/events.service";
import {NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import {Event} from "../models/events";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private eventService: EventsService, private authService: AuthService) { }
  myform: FormGroup;
  events: any;
  loggedin;

  onSubmit() {
      const event = new Event(
        this.myform.value.name,
        this.myform.value.description,
        JSON.parse(localStorage.getItem('user')).userId,
        this.myform.value.date,
        );

      this.eventService.addEvent(event).subscribe(
          data => console.log(data),
          error => console.error(error)
        );
    this.myform.reset();
  }

  ngOnInit() {
    // get the events from db
    this.eventService.getEvents()
      .subscribe(
        events => this.events = events,
        error => console.log(error));

      // initilize the form
      this.myform = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        date: new FormControl('')
      });
      // check if user is logged in
      this.loggedin = this.authService.isLoggedIn();
  }
}
