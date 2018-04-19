import { Component, OnInit } from '@angular/core';
import {EventsService} from "../services/events.service";
import {NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import {Event} from "../models/events";


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private eventService: EventsService) { }
  myform: FormGroup;
  events: Event[];

  onSubmit() {
      const event = new Event(
        this.myform.value.name,
        this.myform.value.description,
        this.myform.value.date);

      this.eventService.addEvent(event)
        .subscribe(
          data => this.events.push(event),
          error => console.error(error)
        );
    this.myform.reset();
  }

  ngOnInit() {
    // get the events from db
    this.eventService.getEvents()
      .subscribe(
        data => this.events = data.obj,
        error => console.log(error));

      // initilize the form
      this.myform = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        date: new FormControl('')
      });
  }
}
