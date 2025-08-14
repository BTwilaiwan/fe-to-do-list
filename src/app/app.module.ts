import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TableModule } from 'primeng/table';

import { LeftMenuComponent } from './left-menu/left-menu.component';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AlertService } from '../app/shared/service/alert.service';
@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    MenuBarComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AvatarModule,
    MenubarModule,
    ButtonModule,
    TableModule
  ],
  providers: [
    AlertService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
