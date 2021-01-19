import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  bookForm: FormGroup;

  isNewBook = true;

  constructor(private fb: FormBuilder, private http: HttpClient, private activatedRoute: ActivatedRoute) { }

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
      });
    }
  }

  save() {
    const url = `${environment.baseUrl}book`;
    if (this.isNewBook) {
      this.http.post(url, this.bookForm.value).subscribe(() => {
        console.log('post');
      },
        err => console.log(err));
    } else {
      this.http.put(url, this.bookForm.value).subscribe(() => {
        console.log('put');
      },
        err => console.log(err));
    }
  }

}
