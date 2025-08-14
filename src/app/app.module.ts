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

import { LeftMenuComponent } from './left-menu/left-menu.component';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AlertService } from '../app/shared/service/alert.service';
import { TaskListDialogComponent } from './task-list/task-list-dialog/task-list-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    MenuBarComponent,
    TaskListComponent,
    TaskListDialogComponent
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
    InputTextModule
  ],
  providers: [
    HttpClientModule,
    AlertService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
