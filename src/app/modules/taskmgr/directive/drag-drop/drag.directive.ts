import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {
  private _isDraggble = false;

  @Input('app-draggable')
  set isDraggable(value: boolean) {
    this._isDraggble = value;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${value}`);
  }

  get isDraggable() {
    return this._isDraggble;
  }

  @Input() draggedClass: string;
  @Input() dragTag: string;
  @Input() dragData: any;

  constructor(private el: ElementRef, private rd: Renderer2, private service: DragDropService) { }

  @HostListener('dragstart', ['$event'])
  ondragstart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass); // add class to el
      this.service.setDragData({ tag: this.dragTag, data: this.dragData });
    }
  }

  @HostListener('dragend', ['$event'])
  ondragend(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass); // remove class from el
    }
  }

}
