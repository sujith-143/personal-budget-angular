import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BREADCRUMPSComponent } from './breadcrumps.component';

describe('BREADCRUMPSComponent', () => {
  let component: BREADCRUMPSComponent;
  let fixture: ComponentFixture<BREADCRUMPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BREADCRUMPSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BREADCRUMPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
