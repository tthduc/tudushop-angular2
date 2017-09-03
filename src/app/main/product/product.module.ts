import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {Routes,RouterModule} from '@angular/router';
export const ProductRoutes : Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:ProductComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes)
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
