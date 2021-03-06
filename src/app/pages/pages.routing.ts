import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';

export const childRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', loadChildren: './index/index.module#IndexModule' },
            { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
            { path: 'class', loadChildren: './classes/classes.module#ClassModule' },
            { path: 'student', loadChildren: './student/student.module#StudentModule' },
            { path: 'editor', loadChildren: './editor/editor.module#EditorModule' },
            { path: 'story', loadChildren: './story/story.module#StoryModule' },
            { path: 'icon', loadChildren: './icon/icon.module#IconModule' },
            //{ path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'form', loadChildren: './form/form.module#FormModule' },
            //{ path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'ui', loadChildren: './ui/ui.module#UIModule' },
            //{ path: 'table', loadChildren: './table/table.module#TableModule' },
            //{ path: 'menu-levels', loadChildren: './menu-levels/menu-levels.module#MenuLevelsModule' },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
