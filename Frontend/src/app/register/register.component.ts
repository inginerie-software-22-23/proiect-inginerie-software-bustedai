import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';
import { Observable } from 'rxjs';
var check = true;
@Component({
    selector: 'cf-login',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public signUpForm !: FormGroup
    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            password: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
            email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
        })
    }

    options: AnimationOptions = {
        path: '/assets/lottie/camera-login.json'
    };
    onAnimate(animationItem: AnimationItem): void {
        console.log(animationItem);
    }

    signUp() {
        if (check && this.signUpForm.valid) {
            this.http.get<any>("http://localhost:3000/signupUsersList")
                .subscribe(res => {
                    const user = res.find((a: any) => {

                        return a.email === this.signUpForm.value.email && a.password === this.signUpForm.value.password
                    });
                    if (user) {
                        alert('User already exists\n We will redirect you to login page');

                        this.signUpForm.reset()
                        this.router.navigate(["auth"])
                    } else {
                        check == false;
                    }
                }, err => {
                    alert("Something went wrong")
                })
        }
        else if (this.signUpForm.valid && check == false) {
            this.http.post<any>("http://localhost:3000/signupUsersList", { email: this.signUpForm.value.email, password: this.signUpForm.value.password })

                .subscribe(res => {
                    if (this.signUpForm.valid) {
                        alert('SIGN UP SUCCESFUL!');
                        console.log(res);
                        this.signUpForm.reset()
                        this.router.navigate(["auth"]);
                    } else {

                        alert("Please enter valid data! Email should be a email format and password has min-legth of 8 chars")
                    }

                }, err => {
                    alert("Something went wrong")
                })
        } else {
            alert("Please enter valid data! Email should be a email format and password has min-legth of 8 chars.\nPassword should contain at least one big letter, one small, one character and one number")

        }
    }
}