import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerivesService } from 'src/app/services/serives.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userEmail:any;
  question:any;
  answerStatus: any;
  count: any;
  
  constructor(private router:Router,private httpservice:SerivesService) { }

  ngOnInit() {
    let user:any = localStorage.getItem('user');
    user =JSON.parse(user);
    if(!user){
      localStorage.removeItem('user');
      this.router.navigateByUrl('login');
    }
    this.userEmail = user.email;
  }

  playquiz(){
    this.httpservice.get('question-get').subscribe(res=>{
      console.log(res,'ccccc');
      if(res.status_code == 200){
        this.question =res.datas;
      }
    });
  }


  selectOption(questionIndex: number, selectedOption: any, questionId: number, selectedValue: any,rightAns:any) {
    let obj = { selectedOption, questionId, selectedValue };
    console.log(this.question,'ccccc',obj,this.question[questionIndex]);
    if (JSON.stringify(this.question[questionIndex].userAns) === JSON.stringify(obj)) {
      let object = this.question[questionIndex];
      delete object.userAns;
      this.count--;
      console.log(object,'objectobjectobject');
    } else {
      if (this.question[questionIndex].userAns) {

      } else {
        this.count++;
      }
      console.log(this.question[questionIndex],'object');
      let color;
      if(this.question[questionIndex].answer == rightAns){
        color = 'selectedOption';
      }else{
        color = 'danger';
      }
      this.question[questionIndex].userAns = { selectedOption, questionId, selectedValue,rightAns,color };
    }
  }
  

    // selectOption(questionIndex: number, selectedOption: any, questionId: number, selectedValue: any) {
    //   let obj = { selectedOption, questionId, selectedValue };
    //   console.log(this.question,'ccccc',obj,this.question[questionIndex]);
    //   if (JSON.stringify(this.question[questionIndex].qustion) === JSON.stringify(obj)) {
    //     let object = this.question[questionIndex];
    //     delete object.qustion;
    //     this.count--;
    //   } else {
    //     if (this.question[questionIndex].qustion) {
  
    //     } else {
    //       this.count++;
    //     }
    //     this.question[questionIndex].qustion = { selectedOption, questionId, selectedValue };
    //   }
    // }

  loginOut(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

}
