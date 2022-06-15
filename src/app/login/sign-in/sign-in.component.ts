import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/Login.service';
import { MonitoringService } from 'src/app/Monitoring.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  @ViewChild("siginInForm") signInForm: NgForm;
  @ViewChild("setPasswordForm") setNewPasswordForm: NgForm;
  userToSetNewPassword: boolean = false;
  setPasswordSubscription: Subscription;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.setPasswordSubscription = this.loginService.setNewPasswordFlow.subscribe((userMustSetPwd) => {
      this.userToSetNewPassword = userMustSetPwd;
    })
  }

  onSubmit() {
    console.log(this.signInForm);
    let isSignInSuccessful: boolean =
      this.loginService.verifySignIn(this.signInForm.form.value.username,
        this.signInForm.form.value.password);

    this.loginService.isUserLoggedIn.next(isSignInSuccessful);
    // if (isSignInSuccessful) {
    //   this.router.navigate(['functionalResults']);
    // }

  }

  setNewPassword() {
    this.loginService.setNewPassword(this.setNewPasswordForm.value.newPassword);
  }

  ngOnDestroy(): void {
    this.setPasswordSubscription.unsubscribe();
  }


}
