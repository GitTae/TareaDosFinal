import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategorysListComponent } from '../../components/categorys/categorys-list/categorys-list.component';
import { CategorysFormComponent } from '../../components/categorys/categorys-form/categorys-form.component';
import { CategoryService } from '../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICategory } from '../../interfaces';

@Component({
  selector: 'app-categorys',
  standalone: true,
  imports: [LoaderComponent,
    CategorysListComponent,
    ModalComponent,
    CategorysFormComponent],
  templateUrl: './categorys.component.html',
  styleUrl: './categorys.component.scss'
})
export class CategorysComponent {
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;
  
  
  ngOnInit(): void {
    
    this.categoryService.getAll();
    
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }
  
  onFormEventCalled (params: ICategory) {
    this.categoryService.save(params);
    this.modalService.dismissAll();
  }
  
}
