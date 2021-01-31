import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Statistics } from './statistics.model';
import { BookListUpdateService } from 'src/app/services/book-list-update.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  stats: Statistics;

  constructor(
    private statsService: StatisticsService,
    private update: BookListUpdateService) { }

  ngOnInit() {
    this.updateStats();
    this.update.getObservable().subscribe(() => {
      this.updateStats();
    });
  }

  updateStats() {
    this.statsService.compute(this.getDate(new Date())).subscribe(resp => {
      this.stats = resp;
    });
  }

  getDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }
}
