import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SerivesService } from 'src/app/services/serives.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  userEmail:any;
  question:any;
  answerStatus: any;
  testid: any;
  userid: any;
  coin: any;
  total: any;
  right: any;
  worng: any;
  coins: any;
  
  constructor(private router:Router,private httpservice:SerivesService,private activatedRoute:ActivatedRoute ) {
    
   }

  ngOnInit() {
    let user:any = localStorage.getItem('user');
    user =JSON.parse(user);
    if(!user){
      localStorage.removeItem('user');
      this.router.navigateByUrl('login');
    }
    this.userEmail = user.email;
    
    this.testid = this.activatedRoute.snapshot.paramMap.get('testid');
    this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
    console.log(this.testid,this.userid);

    this.httpservice.get(`result/${this.testid}/${this.userid}`).subscribe(res=>{
      console.log(res,'ccccc');
      if(res.status_code == 200){
        this.httpservice.post(`coin-update`,{'user_id':this.userid,'coin':res.coin}).subscribe(response=>{
          console.log(response,'nnnn');
          if(response.status_code == 200){
            this.coins = response.datas.total_coin;
            this.coin =res.coin;
            this.total =res.total;
            this.right =res.right;
            this.worng =res.worng;
          }
        });
      }
    });
  }

  loginOut(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

}
