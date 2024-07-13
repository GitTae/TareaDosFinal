import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../../interfaces';

@Component({
  selector: 'app-categorys-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorys-form.component.html',
  styleUrl: './categorys-form.component.scss'
})
export class CategorysFormComponent {
  @Input() title: string = '';
  @Input() toUpdateCategory: ICategory = {};
  @Output() callParentEvent: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  addEdit()  {
    this.callParentEvent.emit(this.toUpdateCategory);
  }
}
