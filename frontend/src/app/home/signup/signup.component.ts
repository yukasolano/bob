import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { UsernameNotTakenValidator } from '../validators/username-not-taken.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private signupService: SignupService, private usernameNotTakenValidator: UsernameNotTakenValidator) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required, this.usernameNotTakenValidator.checkUsernameTaken()],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  signup() {
    this.signupService.createUser(this.signupForm.value);
  }
}
