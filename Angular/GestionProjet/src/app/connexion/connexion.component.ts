import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

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

  connectUser() {
    this.userService.loginUser(this.connect).subscribe(
      response => {
        alert('User: ' + this.connect.username + ' is connected');
        this.router.navigate(['Profile']);
//<<<<<<< HEAD
        sessionStorage.setItem("Username", this.connect.username);

//=======
        sessionStorage.setItem("username", this.connect.username);
//>>>>>>> f969c1a8378c141a92a6df09fa611e7f42d8a796
      },
      error => {
        console.log('error', error);
      }
    )

  }

  signIn() {
    this.router.navigate(['Inscription']);
  }
}
