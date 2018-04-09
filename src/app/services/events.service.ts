import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import 'firebase/storage';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { Event } from '../models/events';

@Injectable()
export class EventsService {
    
    getEvent$(): Observable<Event[]> {
        return this.afs.collection<Event>('events')
            .snapshotChanges().map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Event;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            });
    };

    constructor(private afs: AngularFirestore) {
    }

    ngOnInit(){
    }

}
