import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonDetailDialogComponent } from './season-detail-dialog.component';

describe('SeasonDetailDialogComponent', () => {
  let component: SeasonDetailDialogComponent;
  let fixture: ComponentFixture<SeasonDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
