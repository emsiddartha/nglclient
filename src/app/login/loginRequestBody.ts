export class LoginRequestBody{
    username:string
    password:string
    libCode: string
    constructor(username:string,password:string, libCode: string){
        this.username=username
        this.password=password
        this.libCode = libCode
    }
}