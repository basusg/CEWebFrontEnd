import { Routes, RouterModule } from '@angular/router';
// import { StoryComponent } from './story.component;
import { StoryComponent } from './story.component';

const childRoutes: Routes = [
    {
        path: '',
        component: StoryComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
