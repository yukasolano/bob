/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditBookComponent } from './edit-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

  let bookServiceSpy;

  beforeEach(async(() => {

    bookServiceSpy = jasmine.createSpyObj('BookService', ['create', 'update', 'get']);

    TestBed.configureTestingModule({
      declarations: [EditBookComponent],
      imports: [
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: BookService, useValue: bookServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when initialize', () => {
    it('should start with READ and disable start and end date fields', () => {
      const editElem = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      expect(component.bookForm.get('bookStatus').value).toEqual('NOT_READ');
      expect(editElem.querySelector('input[formControlName=startDate]').disabled).toBeTruthy();
      expect(editElem.querySelector('input[formControlName=endDate]').disabled).toBeTruthy();
    });
  });

  describe('when change status to READING', () => {
    it('should disable endDate and enable startDate', () => {
      const editElem = fixture.debugElement.nativeElement;
      component.bookForm.get('bookStatus').setValue('READING');
      component.onChangeStatus();
      fixture.detectChanges();
      expect(editElem.querySelector('input[formControlName=startDate]').disabled).toBeFalsy();
      expect(editElem.querySelector('input[formControlName=endDate]').disabled).toBeTruthy();
    });
  });

  describe('when change status to READ', () => {
    it('should enable start and end date fields', () => {
      const editElem = fixture.debugElement.nativeElement;
      component.bookForm.get('bookStatus').setValue('READ');
      component.onChangeStatus();
      fixture.detectChanges();
      expect(editElem.querySelector('input[formControlName=startDate]').disabled).toBeFalsy();
      expect(editElem.querySelector('input[formControlName=endDate]').disabled).toBeFalsy();
    });
  });
});
