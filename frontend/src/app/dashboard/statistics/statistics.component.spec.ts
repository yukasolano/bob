/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from 'src/app/services/statistics.service';
import { of } from 'rxjs';
import { BookListUpdateService } from 'src/app/services/book-list-update.service';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  let statsServiceSpy;
  let updateServiceSpy;
  let update;
  let stats;
  beforeEach(async(() => {
    statsServiceSpy = jasmine.createSpyObj('StatisticsService', ['compute']);
    updateServiceSpy = jasmine.createSpyObj('BookListUpdateService', ['getObservable']);
    update = updateServiceSpy.getObservable.and.returnValue(of(true));
    stats = statsServiceSpy.compute.and.returnValue(of({
      booksRead: 7,
      booksPerMonth: 3.56789,
      pagesPerDay: 3.1234
    }));
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
      providers: [
        { provide: StatisticsService, useValue: statsServiceSpy },
        { provide: BookListUpdateService, useValue: updateServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update stats', () => {
    const editElem = fixture.debugElement.nativeElement;
    expect(editElem.querySelector('#booksRead').textContent.trim()).toBe('7');
    expect(editElem.querySelector('#booksPerMonth').textContent.trim()).toBe('3.57');
    expect(editElem.querySelector('#pagesPerDay').textContent.trim()).toBe('3');

  });
});
