import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-student-confirmation',
  templateUrl: './delete-student-confirmation.component.html',
  styleUrl: './delete-student-confirmation.component.css'
})
export class DeleteStudentConfirmationComponent {
  @Input() name: string = "deleteStudedntModalInstance";

  constructor(
    public activeModal: NgbActiveModal
  ) { }
}
