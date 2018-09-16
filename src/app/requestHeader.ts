export class RequestHeader{
    contextId:string
    tenancyId:string
    constructor(contextId:string, tenancyId:string){
        this.contextId=contextId
        this.tenancyId=tenancyId
    }
}