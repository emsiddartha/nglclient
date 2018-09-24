import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCatalogueComponent } from './import-catalogue.component';

describe('ImportCatalogueComponent', () => {
  let component: ImportCatalogueComponent;
  let fixture: ComponentFixture<ImportCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
