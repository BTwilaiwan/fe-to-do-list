import { Component, ViewChild } from '@angular/core';
import { AlertService } from '../shared/service/alert.service';
import { TaskService } from '../shared/service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  public dataTable: any[] = [];
  public isShowDialog: boolean = false;
  public defaultData: any = {};

  constructor(
    private alertService: AlertService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.initTask();
  }

  initTask() {
    try {
      this.taskService.getTaskList().subscribe({
        next: (response: any) => {
          const temp = response;
          temp.forEach((element: any) => {
            element.color = 'text-success';
            if(element.priority === 'Hight') element.color = 'text-error';
            if(element.priority === 'Medium') element.color = 'text-warning';
          });
          this.dataTable = temp;
          this.dataTable = this.dataTable.sort((a: any, b: any) => a.priorityId - b.priorityId)
        }, error: (err) => {
           return this.alertService.alert('error', '', err.error.message)
        }
      })
    } catch (error) {
      console.log(error)
      this.alertService.alert('error', '', "Error")
    }
  }

  onOpenDialog() {
    this.isShowDialog = true;
  }

  onEdit(event: any) {
    this.defaultData = event;
    this.isShowDialog = true;
  }

  onComplete(event: any) {
    try {
      this.isShowDialog = false;
      if (event.mode === 'save') {

      }
    } catch (error) {
      console.log(error)
    }
  }
}
