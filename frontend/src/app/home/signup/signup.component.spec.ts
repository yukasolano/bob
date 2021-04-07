/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { setInput, click } from 'src/testing/utilities';
import { SignupService } from 'src/app/services/signup.service';



export function signupWith(fixture: ComponentFixture<SignupComponent>, username: string, password: string, email: string, name: string) {
  const loginElem = fixture.debugElement.nativeElement;

  setInput(loginElem, 'input[formControlName=username]', username);
  setInput(loginElem, 'input[formControlName=password]', password);
  setInput(loginElem, 'input[formControlName=email]', email);
  setInput(loginElem, 'input[formControlName=name]', name);
  tick();
  fixture.detectChanges();

  click(loginElem.querySelector('.login-button'));
  fixture.detectChanges();
}


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signupServiceSpy;
  let createUser;
  let usernameTaken

  beforeEach(async(() => {
    signupServiceSpy = jasmine.createSpyObj('SignupService', ['createUser', 'isUsernameTaken']);
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SignupService, useValue: signupServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    createUser = signupServiceSpy.createUser.and.returnValue(of(null));
    usernameTaken = signupServiceSpy.isUsernameTaken.and.returnValue(of(false));
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signup', fakeAsync(() => {
    const username = 'bob';
    const password = 'pass-bob';
    const email = 'bob@email.com';
    const name = 'Bob';
    const loginElem = fixture.debugElement.nativeElement;

    setInput(loginElem, 'input[formControlName=username]', username);
    setInput(loginElem, 'input[formControlName=password]', password);
    setInput(loginElem, 'input[formControlName=email]', email);
    setInput(loginElem, 'input[formControlName=name]', name);
    tick();
    fixture.detectChanges();

    click(loginElem.querySelector('.login-button'));
    tick();
    fixture.detectChanges();
    expect(createUser).toHaveBeenCalledWith({ username, password, email, name });
  }));
});
