import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/message/message.service';

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
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private message: MessageService) { }

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

    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.isNewBook = false;
      const url = `${environment.baseUrl}book/${id}`;
      this.http.get(url).subscribe(resp => {
        this.bookForm.setValue(resp);
        this.onChangeStatus();
      });
    }
  }

  save() {
    const url = `${environment.baseUrl}book`;
    if (this.isNewBook) {
      this.http.post(url, this.bookForm.value).subscribe(() => {
        this.message.showSuccess('Book created!');
        this.router.navigate(['']);
      },
        err => this.message.showError(err));
    } else {
      this.http.put(url, this.bookForm.value).subscribe(() => {
        this.message.showSuccess('Book updated!');
        this.router.navigate(['']);
      },
        err => this.message.showError(err));
    }
  }

  cancel() {
    this.router.navigate(['']);
  }

  getCardTitle() {
    return this.isNewBook ? "Create a new book to read" : "Update an existing book";
  }

  onChangeStatus() {
    if (this.bookForm.get('bookStatus').value === 'NOT_READ') {
      this.bookForm.get('startDate').reset();
      this.bookForm.get('startDate').disable();
      this.bookForm.get('endDate').reset();
      this.bookForm.get('endDate').disable();
    } else if (this.bookForm.get('bookStatus').value === 'READING') {
      this.bookForm.get('startDate').enable();
      this.bookForm.get('endDate').reset();
      this.bookForm.get('endDate').disable();
    } else if (this.bookForm.get('bookStatus').value === 'READ') {
      this.bookForm.get('startDate').enable();
      this.bookForm.get('endDate').enable();
    }
  }

  fillStartDate() {
    return this.bookForm.get('bookStatus').value === 'READING' ||
      this.bookForm.get('bookStatus').value === 'READ';
  }

  fillEndDate() {
    return this.bookForm.get('bookStatus').value === 'READ';
  }
}
