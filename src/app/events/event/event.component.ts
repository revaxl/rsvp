import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Event } from "../../models/events";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event;

  constructor(private router: Router) { }

  goToEvent() {
    console.log("clicked");
    this.router.navigate(['/event'], { queryParams: { id: this.event.id } })
  }

  

  ngOnInit() {
  }

}
