import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisordinazioniComponent } from './visordinazioni.component';

describe('VisordinazioniComponent', () => {
  let component: VisordinazioniComponent;
  let fixture: ComponentFixture<VisordinazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisordinazioniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisordinazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
