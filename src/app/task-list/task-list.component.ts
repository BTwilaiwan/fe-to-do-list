import { Component } from '@angular/core';
import { AlertService } from '../shared/service/alert.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {}

  openDialog() {
    this.alertService.alert('error', '', 'error')
  }
}
