import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild("userForm") signUpForm: NgForm;
  @ViewChild("confirmForm") confirmationForm: NgForm;
  confirmUser: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.signUpForm)
    console.log(this.signUpForm.form.value)
  }

  onDoConfirm(){
    this.confirmUser = true;
  }  

  onConfirm(){
    console.log(this.confirmationForm)
    console.log(this.confirmationForm.form.value)
  }
}
