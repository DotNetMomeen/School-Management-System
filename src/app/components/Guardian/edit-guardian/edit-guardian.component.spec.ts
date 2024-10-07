import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGuardianComponent } from './edit-guardian.component';

describe('EditGuardianComponent', () => {
  let component: EditGuardianComponent;
  let fixture: ComponentFixture<EditGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGuardianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
