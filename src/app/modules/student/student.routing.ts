import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';

const routes: Routes = [
  { path:"", component:LayoutComponent, children:[
    {path:"list", component:StudentsListComponent, title:"Students List"},
  ] },
];

export const StudentRoutes = RouterModule.forChild(routes);
