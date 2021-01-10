import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup() {

    let url = `${environment.baseUrl}signup`;
    this.http.post(url, this.signupForm.value).subscribe(
      () => this.openSnackBar('Account created. Please log in.', 'Close'),
      err => this.openSnackBar('Authentication failed.', 'Close')
    );

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
