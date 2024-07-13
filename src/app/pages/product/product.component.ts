import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductsListComponent } from '../../components/products/products-list/products-list.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductsFormComponent } from '../../components/products/products-form/products-form.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { IAuthority, IProduct } from '../../interfaces';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    LoaderComponent,
    ProductsListComponent,
    ModalComponent,
    ProductsFormComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
public productService: ProductService = inject(ProductService);
public modalService: NgbModal = inject(NgbModal);
public route: ActivatedRoute = inject(ActivatedRoute);
public authService: AuthService = inject(AuthService);
public routeAuthorities: string[] = [];
public areActionsAvailable: boolean = false;


ngOnInit(): void {
  
  this.productService.getAll();
  
  this.route.data.subscribe( data => {
    this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
    this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
  });
}

onFormEventCalled (params: IProduct) {
  this.productService.save(params);
  this.modalService.dismissAll();
}


}
