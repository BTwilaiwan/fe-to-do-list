import { Component } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

  public items: any[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Task List',
        icon: 'pi pi-list-check',
        routerLink: '/taskList'
      }
    ];
  }
}
