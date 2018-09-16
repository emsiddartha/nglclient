export class GlobalValues{
    tenancyId:string="lib1"
    jwtToken:string=""
    getTenancyId():string{
        return this.tenancyId
    }
    getJwtToken():string{
        return this.jwtToken
    }
}