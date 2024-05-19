import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisprenotazioniComponent } from './visprenotazioni.component';

describe('VisprenotazioniComponent', () => {
  let component: VisprenotazioniComponent;
  let fixture: ComponentFixture<VisprenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisprenotazioniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisprenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
