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
  count: number=0;
  testid: any;
  coins: any;
  btn: boolean = true;
  userid: string;
  
  constructor(private router:Router,private httpservice:SerivesService) { }

  ngOnInit() {
    let user:any = localStorage.getItem('user');
    user =JSON.parse(user);
    this.userid = user.id;
    if(!user){
      localStorage.removeItem('user');
      this.router.navigateByUrl('login');
    }
    this.userEmail = user.email;
    this.coins = user.total_coin;
  }

  playquiz(){
    this.httpservice.get(`question-get/${this.userid}`).subscribe(res=>{
      console.log(res,'ccccc');
      if(res.status_code == 200){
        if(res.datas.length > 0){
          this.question =res.datas;
          this.btn = false;
        }else{
          alert('Today Quiz Not Found');
        }
        
      }
      if(res.status_code == 400){
        alert(res.datas);
      }
    });
  }

    selectOption(questionIndex: number, selectedOption: any, questionId: number, selectedValue: any) {
      let obj = { selectedOption, questionId, selectedValue };
      console.log(this.question,'ccccc',obj,this.question[questionIndex]);
      if (JSON.stringify(this.question[questionIndex].selectedQus) === JSON.stringify(obj)) {
        let object = this.question[questionIndex];
        delete object.selectedQus;
        delete object.useranswer;
        delete object.getCoin;
        this.count--;
        this.testid = this.question[questionIndex].testId;
      } else {
        if (this.question[questionIndex].selectedQus) {
  
        } else {
          this.count++;
        }
        this.question[questionIndex].selectedQus = { selectedOption, questionId, selectedValue };
        this.question[questionIndex].useranswer = selectedValue;
        this.question[questionIndex].getCoin = this.question[questionIndex].coins;
        this.testid = this.question[questionIndex].testId;
        console.log(this.testid,';this.testid');
      }
    }

    quizSubmit(){
      this.httpservice.post(`user-quiz-submit/${this.userid}`,this.question).subscribe(res=>{
        console.log(res,'submit');
        if(res.status_code == 200){
          this.router.navigateByUrl(`/result/${this.testid}/${this.userid}`);
        }
      });
    }

  loginOut(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

}
