import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  selector: 'br-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent extends EditableComponent {

  @Input() type : string = 'text';

  @Input() transformView = function(value){
    return value;
  };

  // @Input() transformView = value => value;

}
