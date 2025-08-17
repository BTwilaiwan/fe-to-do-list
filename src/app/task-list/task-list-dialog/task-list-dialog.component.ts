import { Component, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../shared/service/task.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-task-list-dialog',
  templateUrl: './task-list-dialog.component.html',
  styleUrl: './task-list-dialog.component.scss',
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

  constructor(
    private cdr: ChangeDetectorRef,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      taskCode: new FormControl({value: '', disabled: false},[Validators.required]),
      title: new FormControl({value: '', disabled: false}),
      description: new FormControl({value: '', disabled: false}),
      dueDate: new FormControl({value: new Date(), disabled: false}),
      status: new FormControl({value: '', disabled: false}),
      priority: new FormControl({value: '', disabled: false}),
    })
    this.getDropdown();
  }

  getDropdown() {
    try {
      Promise.all([
        firstValueFrom(this.taskService.getStatus()),
        firstValueFrom(this.taskService.getPriority()),
      ]).then((response: any) => {
        this.optionStatus = response[0];
        this.optionPriority = response[1];
        this.taskForm.patchValue({
          status: this.optionStatus[0].status,
          priority: this.optionPriority[0].priority
        })
      })
    }
    catch (error) {}
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isShowDialog'].currentValue && Object.keys(this.datas).length > 0 ) {
      this.isDisable = true;
      this.initForm();
      this.cdr.markForCheck();
    } else {
      this.isDisable = false;
      this.taskForm.patchValue({ dueDate: new Date() })
      if (this.optionPriority?.length) {
        this.taskForm.get('priority')?.setValue(this.optionPriority[0].priority);
      }
      if (this.optionStatus?.length) {
        this.taskForm.get('status')?.setValue(this.optionStatus[0].status);
      }
    }
  }

  initForm() {
    this.taskForm.patchValue({
      taskCode: this.datas?._id,
      title: this.datas?.title,
      description: this.datas?.description,
      dueDate: new Date(this.datas?.dueDate)
    })
    if (this.optionPriority?.length) {
      this.taskForm.get('priority')?.setValue(this.datas?.priority);
    }
    if (this.optionStatus?.length) {
      this.taskForm.get('status')?.setValue(this.datas?.status);
    }
    this.cdr.detectChanges();
  }

  onSave() {
    if (this.f['taskCode'].invalid) this.requireCode = true;
    if (this.taskForm.valid) {
      let mode = "save";
      if (Object.keys(this.datas).length > 0) mode = "edit";
      this.onComplete.emit({ mode: mode, data: this.taskForm.value });
    }
  }

  onCancel() {
    this.requireCode = false;
    this.taskForm.reset();
    this.onComplete.emit({ mode: "cancel", data: this.taskForm.value });
  }

  isFieldInvalid(fieldName: string): boolean {
    if (this.f['taskCode'].valid) this.requireCode = false;
    const control = this.taskForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

}
