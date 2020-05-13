import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  validateForm: FormGroup;
  connect;


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
    });
    this.connect = {
      password: '',
      username: ''
    };


  }

  connectUser(){
    this.userService.loginUser(this.connect).subscribe(
      response => {
        alert('User: ' + this.connect.username+ ' is connected');
        this.router.navigate(['Profile']);
        sessionStorage.setItem("Username", this.connect.username);

      },
      error => {
        console.log('error', error);
      }


    )

  }

  signIn(){
    this.router.navigate(['Inscription']);
  }
}
