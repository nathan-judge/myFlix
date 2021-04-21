// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls created in 6.2
import { UserLoginService } from '../fetch-api-data.service';

// displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// imports router
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // sends the form inputs to the backend
  userLogin(): void {

    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close(); // closes the modal on success
      console.log(response);
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      this.snackBar.open('Logged in successfully', 'OK', {
        duration: 2000,
      });

    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    });
  }

}
