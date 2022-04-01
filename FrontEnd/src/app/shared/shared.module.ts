import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { AppNotificationsService } from './services/app-notifications.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule
{
}
