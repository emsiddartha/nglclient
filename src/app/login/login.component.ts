import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { ConfigService } from '../config.service';
import { GlobalValues } from '../globalValues.service';
import { RequestHeader } from '../requestHeader';
import { LoginRequestBody } from './loginRequestBody';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ConfigService]
})
export class LoginComponent implements OnInit {
  login: Login = {
    username:'',
    password:''
  };
  rememberMe: boolean = false;
  constructor(private configService:ConfigService, private globalValues:GlobalValues) { }

  ngOnInit() {
  }
  onLoginClick(event:any){
    let header = new RequestHeader("RS",this.globalValues.getTenancyId())
    let body = new LoginRequestBody(this.login.username,this.login.password)
    let request = {header,body}
    let bodyStr = JSON.stringify(request);
    alert(bodyStr)  
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });   
    let options = {
      headers: httpHeaders
    };

    this.configService.httpClient.post<LoginResponse>(this.configService.nglUrl+"/login",bodyStr,options).subscribe((data)=> {
      this.globalValues.jwtToken=data.jwtToken
      alert(this.globalValues.jwtToken)
    },
  (err)=>{
    alert("Login failed")
  })
  }
}
interface LoginResponse{
  jwtToken:string
}