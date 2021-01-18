import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BookListUpdateService } from './book-list-update.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {

  @Input() status;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[];
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient, private update: BookListUpdateService) { }

  ngOnInit() {
    this.displayedColumns = ['title', 'details'];
    this.displayedColumns = this.showStartAction() ? this.displayedColumns.concat('start') : this.displayedColumns;
    this.displayedColumns = this.showFinishAction() ? this.displayedColumns.concat('finish') : this.displayedColumns;
    this.updateTable();
    this.update.getObservable().subscribe(() => {
      this.updateTable();
    });
  }

  updateTable() {
    const url = `${environment.baseUrl}book?status=${this.status}`;
    this.http.get<Object[]>(url).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  showStartAction() {
    return this.status === 'NOT_READ';
  }

  showFinishAction() {
    return this.status === 'READING';
  }

  onDetails(element) {
    console.log('show details of');
    console.log(element);
  }

  onStart(element) {
    this.update.startReading(element.id, new Date);
  }

  onFinish(element) {
    this.update.finishReading(element.id, new Date);
  }
}
