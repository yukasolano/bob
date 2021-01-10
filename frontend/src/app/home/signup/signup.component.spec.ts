/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SignupComponent } from './signup.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/core/message/message.service';
import { setInput, click } from 'src/testing/utilities';



export function signupWith(fixture: ComponentFixture<SignupComponent>, username: string, password: string, email: string, name: string) {
  const loginElem = fixture.debugElement.nativeElement;

  setInput(loginElem, 'input[formControlName=username]', username);
  setInput(loginElem, 'input[formControlName=password]', password);
  setInput(loginElem, 'input[formControlName=email]', email);
  setInput(loginElem, 'input[formControlName=name]', name);
  fixture.detectChanges();

  click(loginElem.querySelector('.login-button'));
  fixture.detectChanges();
}


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpClientSpy;
  let messageServiceSpy;
  let post;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['showSuccess']);
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    post = httpClientSpy.post.and.returnValue(of(null));
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signup', () => {
    const username = 'bob';
    const password = 'pass-bob';
    const email = 'bob@email.com';
    const name = 'Bob';
    let url = `${environment.baseUrl}user`;
    signupWith(fixture, username, password, email, name);
    expect(post).toHaveBeenCalledWith(url, { username, password, email, name });
    expect(messageServiceSpy.showSuccess).toHaveBeenCalledWith('Account created. Please log in.');
  });
});
