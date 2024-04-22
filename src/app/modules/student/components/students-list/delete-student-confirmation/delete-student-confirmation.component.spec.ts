import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStudentConfirmationComponent } from './delete-student-confirmation.component';

describe('DeleteStudentConfirmationComponent', () => {
  let component: DeleteStudentConfirmationComponent;
  let fixture: ComponentFixture<DeleteStudentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteStudentConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteStudentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
