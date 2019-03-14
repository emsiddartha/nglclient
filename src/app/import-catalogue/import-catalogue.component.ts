import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { GlobalValues } from '../globalValues.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CatalogueRecordVO } from '../catalogueRecord';

@Component({
  selector: 'app-import-catalogue',
  templateUrl: './import-catalogue.component.html',
  styleUrls: ['./import-catalogue.component.css'],
  providers: [ConfigService]
})
export class ImportCatalogueComponent implements OnInit {
  marcRecord:string
  constructor(private configService:ConfigService, private globalValues:GlobalValues) { }
  records : CatalogueRecordVO[] = []
  clickedRecord: CatalogueRecordVO
  ngOnInit() {
  }
  onImportClick(event: any){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'x-tenant-id': this.globalValues.getTenancyId(),
      'x-auth-token': this.globalValues.getJwtToken()
    })
    const params = new HttpParams().set('data',this.marcRecord)    
    let options = {
      headers:httpHeaders
    }
    this.configService.httpClient.post(this.configService.nglUrl+"/cataloguing",params,options)
    .subscribe(
      (response)=> {
        this.records=[]
        let indexVal:number = 0;
        /*for(let record of response){
          for(let dataField of record.dataFields){
            if(dataField.tag=='245'){
              let title:string
              let sor:string
              for(let subField of dataField.subFields){
                if(subField.identifier=='a'){
                  title = subField.data
                }
                if(subField.identifier=='c'){
                  sor = subField.data
                }
              }
              let cat = new CatalogueRecordVO()
              cat.title = title+sor
              cat.index = indexVal
              cat.rawRecord = record
              indexVal++
              this.records.push(cat)
              //console.log(title+sor)
            }
          }
          
        }*/
      },
      (error)=>{alert("error"+error)}
      )
  }
  onViewRecordClick(event: any, recordId: number){    
    this.clickedRecord = this.records[recordId]
    console.log(this.clickedRecord)
  }
}
