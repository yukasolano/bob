/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookTableComponent } from './book-table.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { BookListUpdateService } from 'src/app/services/book-list-update.service';
import { MaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;
  let updateServiceSpy;
  let update;
  let routerSpy;
  let bookServiceSpy;
  let getByStatus;


  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['']);
    bookServiceSpy = jasmine.createSpyObj('BookService', ['getByStatus']);
    updateServiceSpy = jasmine.createSpyObj('BookListUpdateService', ['getObservable']);
    update = updateServiceSpy.getObservable.and.returnValue(of(true));
    getByStatus = bookServiceSpy.getByStatus.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [BookTableComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: BookService, useValue: bookServiceSpy },
        { provide: BookListUpdateService, useValue: updateServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
