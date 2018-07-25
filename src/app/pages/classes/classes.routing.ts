import { Routes, RouterModule } from '@angular/router';
import { ClassComponent } from './classes.component';
import { ListClassComponent } from './components/class/list-class.component';
//import { ViewUserComponent } from './components/view-user/view-user.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ClassComponent,
        children: [
            { path: '', redirectTo: 'list-class', pathMatch: 'full' },
            { path: 'list-class', component: ListClassComponent },
           //{ path: 'view-user/:id', component: ViewUserComponent },
            {path: 'class/**',redirectTo: ''}
            //{ path: 'data-table', component: DataTableComponent },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
