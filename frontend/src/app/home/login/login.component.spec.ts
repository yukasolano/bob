/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/core/auth/auth.service';

export const ButtonClickEvents = {
  left: { button: 0 }, right: { button: 2 }
};

export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left) {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

export function setInput(el: any, querySelector: string, value: string) {
  const input = el.querySelector(querySelector);
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

export function loginWith(fixture: ComponentFixture<LoginComponent>, username: string, password: string) {
  const loginElem = fixture.debugElement.nativeElement;

  setInput(loginElem, 'input[formControlName=username]', username);
  setInput(loginElem, 'input[formControlName=password]', password);
  fixture.detectChanges();

  click(loginElem.querySelector('.login-button'));
  fixture.detectChanges();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy;
  let matSnackBarSpy;
  let routerSpy;

  beforeEach(async(() => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['authenticate']);
    matSnackBarSpy = jasmine.createSpyObj('MatSnakBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when succefully authenticate', () => {

    let authenticate;
    const username = 'username';
    const password = 'password';

    beforeEach(() => {
      authenticate = authServiceSpy.authenticate.and.returnValue(of(null));
      loginWith(fixture, username, password);
    });

    it('should login with username and password', () => {
      expect(authenticate).toHaveBeenCalledWith(username, password);
    });

    it('should redirect', () => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
    });

  });

  describe('when failed to authenticate', () => {

    it('should show error message', () => {
      const authenticate = authServiceSpy.authenticate.and.returnValue(throwError('Error'));
      loginWith(fixture, 'username', 'password');
      expect(matSnackBarSpy.open).toHaveBeenCalledWith('Authentication failed.', 'Close', Object({ duration: 2000 }));
    });
  });

});


