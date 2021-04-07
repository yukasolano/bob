/* tslint:disable:no-unused-variable */
import { render , fireEvent, getByText, waitFor, screen} from '@testing-library/angular'

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/core/message/message.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('LoginComponent By testing library',  () => {
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['authenticate']);
  const messageServiceSpy = jasmine.createSpyObj('MessageService', ['showError']);


  it('should login succesfully', async() => {
    let authenticate = authServiceSpy.authenticate.and.returnValue(of(null));
    const component = await render(LoginComponent, {
      imports: [ MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ]
    })

    fireEvent.click(component.getByText('Login'))
    expect(authenticate).not.toHaveBeenCalled();

    const username = component.getByLabelText(/username/i);
    fireEvent.input(username, {target: {value: 'myname'}})

    const password = component.getByLabelText(/password/i);
    fireEvent.input(password, {target: {value: 'mypassword'}})

    fireEvent.click(component.getByText('Login'))

    expect(authenticate).toHaveBeenCalledWith('myname', 'mypassword');
    
  })

  it('should show error message', async() => {
    const component = await render(LoginComponent, {
      imports: [ MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ]
    })
    let authenticate = authServiceSpy.authenticate.and.returnValue(throwError('Error'));

    const username = component.getByLabelText(/username/i);
    fireEvent.input(username, {target: {value: 'myname'}})

    const password = component.getByLabelText(/password/i);
    fireEvent.input(password, {target: {value: 'mypassword'}})

    fireEvent.click(component.getByText('Login'))

    expect(messageServiceSpy.showError).toHaveBeenCalledWith('Authentication failed.');
  });

})
