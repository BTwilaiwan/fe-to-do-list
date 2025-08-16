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
  public selectedTask: any;

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
        this.taskService.createTask(event.data).subscribe({
          next: (res: any) => {
            if (res) {
              this.alertService.alert('success', '', 'Success').then((data) => {
                if (data.isConfirmed) {
                  this.initTask();
                }
              })
            }
          }, error: (err) => {
            return this.alertService.alert('error', '', err.error.result);
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  onDelete(id: any) {
    this.alertService.confirmAlert('question', '', 'Confirm Delete?').then((data) => {
      if (data.isConfirmed) {
        this.taskService.deleteTask(id).subscribe({
          next: (response: any) => {
            this.alertService.alert('success', '', response.result).then((dataSucc) => {
              if(dataSucc.isConfirmed) {
                  this.initTask();
              }
            })
          }, error: (err) => {
            return this.alertService.alert('error', '', err.error.result);
          }
        })
      }
    })
  }

  get tableSelection(): any[] {
    return this.selectedTask;
  }

  set tableSelection(value: any[]) {
    console.log("Selected rows:", value);
    // this.selectedTask = value.filter(row => row.status !== 'Done');
  }

  onSelectedTask() {
    console.log(this.selectedTask)
    return true
  }

  onSelectRow(event: any) {
    const countSelect = this.selectedTask.filter((e: any) => e.status !== 'Done' ).length;
    const countTable = this.dataTable.filter((e: any) => e.status !== 'Done' ).length;
    if (countSelect === countTable) {
      this.selectedTask = this.dataTable;
      return this.selectedTask
    }
  }

}
