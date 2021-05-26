import { Component, OnInit } from '@angular/core';import { FormGroup, FormBuilder } from '@angular/forms';import { ActivatedRoute, Router } from '@angular/router';import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-search-book',
    templateUrl: './search-book.component.html',
  })
  export class SearchBookComponent implements OnInit {
  
    bookForm: FormGroup;
    filteredOptions: Observable<string[]>;
    titles
  
    constructor(
      private fb: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private bookService: BookService) { }
  
    ngOnInit() {
  
      this.bookForm = this.fb.group({
        title: [''],
      });

     this.bookService.getTitles().subscribe(resp => {
         this.titles = resp;
         this.filteredOptions = this.bookForm.get('title').valueChanges
         .pipe(
           startWith(''),
           map(value => this._filter(value))
         );
     })

  
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
    
        return this.titles.filter(option => option.toLowerCase().includes(filterValue));
      }
  
    cancel() {
      this.router.navigate(['']);
    }
  
    getCardTitle() {
      return "Search a book";
    }

    save() {

    }
  
  }
  