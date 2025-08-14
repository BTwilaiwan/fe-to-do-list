import { Component } from '@angular/core';
import { AlertService } from '../shared/service/alert.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  public dataTable: any[] = [];

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.dataTable = [{no: 1}]
  }

  onOpenDialog() {
    this.alertService.alert('error', '', 'error')
  }

  onEdit(event: any) {}
}
