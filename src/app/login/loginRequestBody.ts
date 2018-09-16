export class LoginRequestBody{
    userId:string
    password:string
    constructor(userId:string,password:string){
        this.userId=userId
        this.password=password
    }
}