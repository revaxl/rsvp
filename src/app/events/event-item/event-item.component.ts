import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {
  private id: string;
  event: any;
  userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userId : "";
  expired: string;
  disabled: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventService: EventsService,
              private toastr: ToastrService) { 
  }


  ngOnInit() {
      console.log("event item");
      this.id = this.route.snapshot.params['id'];
      this.eventService.getEvent(this.id).subscribe(
        data => { this.event = data; this.isExpired() },
        error => this.toastr.error(error)
      );
    }

  join() {
    if (Date.parse(this.event.date) < Date.now() && this.userId !== "")
      return alert('error');
    this.eventService.joinEvent(this.id).subscribe(
        data => this.toastr.success(data.message),
        error => this.toastr.error(error.message)
    );
  }
  isExpired() {
    if (Date.parse(this.event.date) < Date.now()) {
      this.expired = 'btn btn-danger';
      this.disabled = true;
    } 
    else {
      this.expired = 'btn btn-success';
    }
  }

}
