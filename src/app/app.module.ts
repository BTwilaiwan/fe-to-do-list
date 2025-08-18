import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';

import { LeftMenuComponent } from './left-menu/left-menu.component';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AlertService } from '../app/shared/service/alert.service';
import { TaskListDialogComponent } from './task-list/task-list-dialog/task-list-dialog.component';
import { TaskListFilterComponent } from './task-list/task-list-filter/task-list-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    MenuBarComponent,
    TaskListComponent,
    TaskListDialogComponent,
    TaskListFilterComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AvatarModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    DialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    AccordionModule
  ],
  providers: [
    HttpClientModule,
    AlertService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
