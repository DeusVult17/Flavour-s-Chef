import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezioneComponent } from './selezione.component';

describe('SelezioneComponent', () => {
  let component: SelezioneComponent;
  let fixture: ComponentFixture<SelezioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelezioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelezioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
