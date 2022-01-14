import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SerivesService } from 'src/app/services/serives.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private fmgroup:FormBuilder,private router:Router,private httpservice:SerivesService) { }

  ngOnInit() {
  this.loginForm = this.fmgroup.group({
    'email':['admin@gmail.com',Validators.required],
    'password':['admin@123',Validators.required],
  })
  }

  login(){
    let val= this.loginForm.value;
    let obj={
      email:val.email,
      password:val.password
    }
    this.httpservice.post(`login`,obj).subscribe(res=>{
      console.log(res,'submit');
      if(res.status_code == 200){
        localStorage.setItem('user',JSON.stringify(res.datas));
        this.router.navigateByUrl('index');
      }else{
        alert('enter vaild email and password');
      }
    });
  }


}
