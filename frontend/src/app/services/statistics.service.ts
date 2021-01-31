import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistics } from '../dashboard/statistics/statistics.model';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
    private url = `${environment.baseUrl}statistics`;

    constructor(private http: HttpClient) { }

    compute(date: string): Observable<Statistics> {
        return this.http.get<Statistics>(`${this.url}?date=${date}`);
    }
}