import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  bookForm: FormGroup;
  isNewBook = true;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BookService) { }

  ngOnInit() {

    this.bookForm = this.fb.group({
      id: [''],
      title: [''],
      author: [''],
      subject: [''],
      publisher: [''],
      pages: [''],
      bookStatus: ['NOT_READ'],
      startDate: [''],
      endDate: ['']
    });

    this.onChangeStatus();
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.isNewBook = false;
      this.bookService.get(id).subscribe(resp => {
        this.bookForm.setValue(resp);
        this.onChangeStatus();
      });
    }
  }

  save() {
    if (this.isNewBook) {
      this.bookService.create(this.bookForm.value);
    } else {
      this.bookService.update(this.bookForm.value);
    }
  }

  cancel() {
    this.router.navigate(['']);
  }

  getCardTitle() {
    return this.isNewBook ? "Create a new book to read" : "Update an existing book";
  }

  onChangeStatus() {
    if (this.isNotRead()) {
      this.bookForm.get('startDate').reset();
      this.bookForm.get('startDate').disable();
      this.bookForm.get('endDate').reset();
      this.bookForm.get('endDate').disable();
    } else if (this.isReading()) {
      this.bookForm.get('startDate').enable();
      this.bookForm.get('endDate').reset();
      this.bookForm.get('endDate').disable();
    } else if (this.isRead()) {
      this.bookForm.get('startDate').enable();
      this.bookForm.get('endDate').enable();
    }
  }

  fillStartDate() {
    return this.isReading() || this.isRead();
  }

  fillEndDate() {
    return this.isRead();
  }

  isNotRead() {
    return this.bookForm.get('bookStatus').value === 'NOT_READ';
  }

  isReading() {
    return this.bookForm.get('bookStatus').value === 'READING';
  }

  isRead() {
    return this.bookForm.get('bookStatus').value === 'READ';
  }
}
