import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { collapse } from '../../animation/collapse-animate';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [collapse]
})
export class CardComponent {
  @Input() cardTitle: any;
  @Input() isCollapse: boolean = false;

  @Input() isAdd: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() isCancel: boolean = false;
  @Input() isPublish: boolean = false;

  @Output() action = new EventEmitter<string>();

  collapse: string = 'on';

  // that.content.emit(html);

  private actionItem(act) {
    this.action.emit(act);
  }

  private collapseCard() {
    this.collapse === 'on' ? this.collapse = 'off' : this.collapse = 'on';
  }
}
