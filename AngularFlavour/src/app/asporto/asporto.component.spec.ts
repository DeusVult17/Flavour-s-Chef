import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsportoComponent } from './asporto.component';

describe('AsportoComponent', () => {
  let component: AsportoComponent;
  let fixture: ComponentFixture<AsportoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsportoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsportoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
