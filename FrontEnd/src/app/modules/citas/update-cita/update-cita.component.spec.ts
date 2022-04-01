import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCitaComponent } from './update-cita.component';

describe('UpdateCitaComponent', () => {
  let component: UpdateCitaComponent;
  let fixture: ComponentFixture<UpdateCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
