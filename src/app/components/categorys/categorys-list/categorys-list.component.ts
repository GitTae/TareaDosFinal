import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { ProductsFormComponent } from '../../products/products-form/products-form.component';
import { CategorysFormComponent } from '../categorys-form/categorys-form.component';
import { ICategory } from '../../../interfaces';
import { CategoryService } from '../../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorys-list',
  standalone: true,
  imports: [CommonModule,
    ModalComponent,
    CategorysFormComponent],
  templateUrl: './categorys-list.component.html',
  styleUrl: './categorys-list.component.scss'
})
export class CategorysListComponent {
  @Input() itemList: ICategory[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: ICategory = {};
  public categoryService = inject(CategoryService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: ICategory, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: ICategory) {
    this.categoryService.update(params);
    this.modalService.dismissAll();
  }

  deleteGame(category: ICategory) {
    this.categoryService.delete(category);
  }
}
