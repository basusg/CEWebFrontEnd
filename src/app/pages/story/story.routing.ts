import { Routes, RouterModule } from '@angular/router';
// import { StoryComponent } from './story.component;
import { StoryComponent } from './story.component';
import { StoryViewComponent } from './view/story-view.component';

const childRoutes: Routes = [
    {
        path: '',
        component: StoryComponent
    },
    {
        path: 'view/:id',
        component: StoryViewComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
