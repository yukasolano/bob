import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../core/message/message.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {

    private url = `${environment.baseUrl}book`;

    constructor(
        private http: HttpClient,
        private message: MessageService,
        private router: Router) { }

    getByStatus(status: string): Observable<Object[]> {
        return this.http.get<Object[]>(`${this.url}?status=${status}`);
    }

    get(id: number) {
        return this.http.get(`${this.url}/${id}`);
    }

    create(book: any) {
        this.http.post(this.url, book).subscribe(() => {
            this.message.showSuccess('Book created!');
            this.router.navigate(['']);
        },
            err => this.message.showError(err)
        );
    }

    update(book: any) {
        this.http.put(this.url, book).subscribe(() => {
            this.message.showSuccess('Book updated!');
            this.router.navigate(['']);
        },
            err => this.message.showError(err)
        );
    }
}