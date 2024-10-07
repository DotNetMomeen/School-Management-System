import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherComponent } from './view-teacher.component';

describe('ViewTeacherComponent', () => {
  let component: ViewTeacherComponent;
  let fixture: ComponentFixture<ViewTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
