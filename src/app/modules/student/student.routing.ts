import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';

const routes: Routes = [
  {
    path:"", redirectTo: "list", pathMatch: "full"
  },
  {
    path: "", component: LayoutComponent, children: [
      { path: "list", component: StudentsListComponent, title: "Students List" },
      { path: "edit/:id", component: EditStudentComponent, title: "Edit Student" }
    ]
  },
]

export const StudentRoutes = RouterModule.forChild(routes);
