import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TavpiattiComponent } from './tavpiatti.component';

describe('TavpiattiComponent', () => {
  let component: TavpiattiComponent;
  let fixture: ComponentFixture<TavpiattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TavpiattiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TavpiattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
