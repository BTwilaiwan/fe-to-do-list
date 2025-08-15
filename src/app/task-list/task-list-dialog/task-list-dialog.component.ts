import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list-dialog',
  templateUrl: './task-list-dialog.component.html',
  styleUrl: './task-list-dialog.component.scss'
})
export class TaskListDialogComponent {

  @Input() isShowDialog: boolean = false;
  @Input() datas: any = {};
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

  public taskForm!: FormGroup;
  public requireCode: boolean = false;
  public isDisable: boolean = false;
  public optionStatus: any[] = [];
  public optionPriority: any[] = [];

  get f() { return this.taskForm.controls; }

  constructor() {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      taskCode: new FormControl({value: '', disabled: false},[Validators.required]),
      title: new FormControl({value: '', disabled: false}),
      description: new FormControl({value: '', disabled: false}),
      dueDate: new FormControl({value: '', disabled: false}),
      status: new FormControl({value: '', disabled: false}),
      priority: new FormControl({value: '', disabled: false}),
    })
  }

  onSave() {
    console.log(this.taskForm)
    // if (this.f['employeeCode'].invalid) this.requireCode = true;
    if (this.taskForm.valid) {
      this.onComplete.emit({ mode: "save", data: this.taskForm.value });
    }
  }

  onCancel() {
    this.requireCode = false;
    this.taskForm.reset();
    this.onComplete.emit({ mode: "cancel", data: this.taskForm.value });
  }

  isFieldInvalid(fieldName: string): boolean {
    // if (this.f['employeeCode'].valid) this.requireCode = false;
    const control = this.taskForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

}
