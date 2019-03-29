import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { GlobalValues } from '../globalValues.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CatalogueRecordVO } from '../catalogueRecord';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-import-catalogue',
  templateUrl: './import-catalogue.component.html',
  styleUrls: ['./import-catalogue.component.css'],
  providers: [ConfigService]
})
export class ImportCatalogueComponent implements OnInit {
  marcRecord:string  
  constructor(private configService:ConfigService, private globalValues:GlobalValues) {

  }
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
    let options = {
      headers:httpHeaders
    }
    
  const obs = this.configService.httpClient.post(this.configService.nglCataloguingUrl+"/cataloguing/parseiso2709",this.marcRecord,options)
  const myObserver = {
    next: x => {
      let records:MarcRecord[] = JSON.parse(JSON.stringify(x))         
      for(let loop = 0; loop<records.length; loop++){
        let title=""
        const oneRec = records[loop]
        for(let loop1=0; loop1<oneRec.dataFields.length;loop1++){
          const dataField = oneRec.dataFields[loop1]
          if(dataField.tag=="245"){
            let titleS,sorS,rtitleS = ""            
            for(let loop3=0; loop3<dataField.subfields.length; loop3++){
                const subfield = dataField.subfields[loop3]
                if(subfield.identifier=="a"){
                   titleS = subfield.data 
                }
                if(subfield.identifier=="b"){
                  rtitleS = subfield.data 
               }
               if(subfield.identifier=="c"){
                sorS = subfield.data 
             }
            }
            title=titleS+rtitleS+sorS
          }
        }
        console.log(title)
        let cat = new CatalogueRecordVO()
              cat.title = title
              cat.index = loop
              cat.rawRecord = oneRec
              this.records.push(cat)
      }            
    },
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };
  obs.subscribe(myObserver)
    
    
    
  }
  onViewRecordClick(event: any, recordId: number){    
    this.clickedRecord = this.records[recordId]
    console.log(this.clickedRecord)
  }
}
