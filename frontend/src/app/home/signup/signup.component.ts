import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/core/message/message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private message: MessageService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  signup() {
    let url = `${environment.baseUrl}user`;
    this.http.post(url, this.signupForm.value).subscribe(
      () => this.message.showSuccess('Account created. Please log in.'),
      err => this.message.showError('Account creation failed.')
    );

  }
}
