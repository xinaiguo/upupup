import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onInvite = new EventEmitter<void>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDel = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onInviteClick() {
    this.onInvite.emit();
  }

  onEditClick() {
    this.onEdit.emit();
  }

  onDelete(){
    this.onDel.emit();
  }

}
