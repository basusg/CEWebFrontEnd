import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { FormsModule } from '@angular/forms';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* service */
import { AuthService } from './service/auth.service';
import { RestCallService } from './service/restCall.service';

/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        routing,
        FormsModule
    ],
    declarations: [
        PagesComponent,
        LoginComponent
    ],
    providers: [AuthService,RestCallService]
})
export class PagesModule { }
