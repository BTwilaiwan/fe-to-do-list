import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-list-filter',
  templateUrl: './task-list-filter.component.html',
  styleUrl: './task-list-filter.component.scss'
})
export class TaskListFilterComponent {

  @Input() datas: any[] = [];
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

  public filterForm!: FormGroup;
  public optionTaskCode: any[] = [];
  public optionStatus: any[] = [];
  public optionPriority: any[] = [];

  ngOnInit() {
    this.filterForm = new FormGroup({
      taskCode: new FormControl({value: '', disabled: false}),
      status: new FormControl({value: '', disabled: false}),
      priority: new FormControl({value: '', disabled: false}),
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['datas'].currentValue) {
      this.getDropdown();
    }
  }

  getDropdown() {
    this.optionTaskCode = this.datas.map(item => ({name: item._id, value: item._id}))
    .filter((value: any, i: number, self: any) => i === self.findIndex((t: any) => t.value === value.value));

    this.optionStatus = this.datas.map(item => ({name: item.status, value: item.status}))
    .filter((value: any, i: number, self: any) => i === self.findIndex((t: any) => t.value === value.value));

    this.optionPriority = this.datas.map(item => ({name: item.priority, value: item.priorityId}))
    .filter((value: any, i: number, self: any) => i === self.findIndex((t: any) => t.value === value.value));
  }

  onSearch() {
    this.onComplete.emit({ isFilter: true, data: this.filterForm.value });
  }

  onClear() {
    this.filterForm.reset();
    this.onComplete.emit({ isFilter: false, data: this.filterForm.value });
  }
}
