import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresComponent } from './progres.component';

describe('ProgresComponent', () => {
  let component: ProgresComponent;
  let fixture: ComponentFixture<ProgresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
