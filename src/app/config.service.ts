import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ConfigService{
    nglUrl:string = "http://localhost:8080"
    httpClient:HttpClient
    constructor(private http:HttpClient){
        this.httpClient=http
    }    
}