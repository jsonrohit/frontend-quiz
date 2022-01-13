import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email:any = 'admin@gmail.com';
  password:any= 'admin@123';
  
  constructor(private fmgroup:FormBuilder,private router:Router) { }

  ngOnInit() {
  this.loginForm = this.fmgroup.group({
    'email':['admin@gmail.com',Validators.required],
    'password':['admin@123',Validators.required],
  })
  }

  login(){
    let val= this.loginForm.value;
    if(val.email==this.email && val.password ==this.password){
      localStorage.setItem('user',JSON.stringify(val));
      this.router.navigateByUrl('index');
  }
    else{
    alert('enter vaild email and password');
  }
  }

}
