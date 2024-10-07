import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuardianComponent } from './create-guardian.component';

describe('CreateGuardianComponent', () => {
  let component: CreateGuardianComponent;
  let fixture: ComponentFixture<CreateGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGuardianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
