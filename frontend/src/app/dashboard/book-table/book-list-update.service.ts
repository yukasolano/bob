import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BookListUpdateService {

    notifyToUpdate = new Subject<boolean>();

    constructor(private http: HttpClient) { }

    getObservable() {
        return this.notifyToUpdate.asObservable();
    }

    startReading(id: number, date: Date) {
        const url = `${environment.baseUrl}book/start`;
        this.http.post(url, { id: id, date: date.toISOString().slice(0, 10) }).subscribe(
            () => {
                //send notification to update table
                this.notifyToUpdate.next(true);
            },
            err => { });
    }

    finishReading(id: number, date: Date) {
        const url = `${environment.baseUrl}book/finish`;
        this.http.post(url, { id: id, date: date.toISOString().slice(0, 10) }).subscribe(
            () => {
                //send notification to update table
                this.notifyToUpdate.next(true);
            },
            err => { });
    }
}