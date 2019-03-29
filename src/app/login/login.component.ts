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
  selectedLibCode:string
  libMap = new Map  
  login: Login = {
    username:'PF6SRA01',
    password:'abc'
  };
  rememberMe: boolean = false;
  constructor(private configService:ConfigService, private globalValues:GlobalValues) {
    
   }

  ngOnInit() {
    this.loadLibraries();
  }
  loadLibraries(){
    let httpHeaders = new HttpHeaders({ 
      'Content-Type':'application/x-www-form-urlencoded',
      'x-tenant-id': this.globalValues.getTenancyId(),
      'x-auth-token': this.globalValues.getJwtToken()
    })

    this.configService.httpClient.get(this.configService.nglUrl+"/aa/listLibraries",{responseType:'json'})
    .subscribe((response)=> {     
      this.libMap.clear
      let jsonresp = JSON.parse(JSON.stringify(response))           
      for(let lib of jsonresp.response){
        this.libMap.set(lib.libraryCode,lib.libraryName)
      }
      console.log(this.libMap)
    },
    (error)=>{console.log("error"+error)}
    );
}
  onLoginClick(event:any){
    let header = new RequestHeader("libCode",this.selectedLibCode)
    let body = new LoginRequestBody(this.login.username,this.login.password,this.selectedLibCode)
    let request = {header,body}
    let bodyStr = JSON.stringify(body);
    alert(bodyStr)  
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache',
      'libCode' : this.selectedLibCode
    });   
    let options = {
      headers: httpHeaders
    };

    this.configService.httpClient.post<LoginResponse>(this.configService.nglUrl+"/aa/authenticate",bodyStr,options).subscribe((data)=> {
      console.log(data)
      this.globalValues.jwtToken=data.jwtToken
      this.globalValues.tenancyId=body.libCode
      console.log(this.globalValues.jwtToken)
      console.log("libcode......"+this.globalValues.tenancyId)
      alert("Login successful")
    },
  (err)=>{
    console.error("Login failed..."+err)
  })
  }
  getKeys(){
    return Array.from(this.libMap.keys())
  }
}
interface LoginResponse{
  jwtToken:string
}