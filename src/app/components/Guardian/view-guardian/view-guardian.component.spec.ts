import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuardianComponent } from './view-guardian.component';

describe('ViewGuardianComponent', () => {
  let component: ViewGuardianComponent;
  let fixture: ComponentFixture<ViewGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGuardianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
