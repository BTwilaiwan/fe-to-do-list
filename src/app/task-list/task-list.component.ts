import { Component } from '@angular/core';
import { AlertService } from '../shared/service/alert.service';
import { TaskService } from '../shared/service/task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  public dataTable: any[] = [];

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
          console.log(response)
          const temp = response;
          temp.forEach((element: any) => {
            element.color = 'text-success';
            if(element.priority === 'High') element.color = 'text-error';
            if(element.priority === 'Medium') element.color = 'text-warning';
          });
          this.dataTable = temp;
          console.log(this.dataTable)
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
    this.alertService.alert('error', '', 'error')
  }

  onEdit(event: any) {}
}
