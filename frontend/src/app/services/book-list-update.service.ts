import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from '../core/message/message.service';

@Injectable({ providedIn: 'root' })
export class BookListUpdateService {

    private url = `${environment.baseUrl}book`;
    notifyToUpdate = new Subject<boolean>();

    constructor(private http: HttpClient, private message: MessageService) { }

    getObservable() {
        return this.notifyToUpdate.asObservable();
    }

    startReading(id: number, date: Date) {
        this.http.post(`${this.url}/start`, { id: id, date: this.getDate(date) }).subscribe(
            () => {
                this.message.showSuccess('Start reading');
                this.notifyToUpdate.next(true);
            },
            err => this.message.showError('Could not start reading'));
    }

    finishReading(id: number, date: Date) {
        this.http.post(`${this.url}/finish`, { id: id, date: this.getDate(date) }).subscribe(
            () => {
                this.message.showSuccess('Stop reading');
                this.notifyToUpdate.next(true);
            },
            err => this.message.showError('Could not stop reading'));
    }

    getDate(date: Date) {
        return date.toISOString().slice(0, 10);
    }
}