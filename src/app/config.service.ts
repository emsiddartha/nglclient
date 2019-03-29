import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ConfigService{
    nglUrl:string = "http://localhost:8081"
    nglCataloguingUrl:string = "http://localhost:8082"
    httpClient:HttpClient
    constructor(private http:HttpClient){
        this.httpClient=http
    }    
}