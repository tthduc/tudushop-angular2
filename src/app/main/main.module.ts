import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutes } from './main.routes';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { HomeModule } from './home/home.module';
import { FunctionModule } from './function/function.module';
import { HttpModule } from '@angular/http';
import { ProductCategoryModule } from './product-category/product-category.module';
import { RoleModule } from './role/role.module';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    UserModule,
    ProductModule,
    ProductCategoryModule,
    RoleModule,
    HttpModule,
    FunctionModule,
    RouterModule.forChild(MainRoutes)
  ],
  providers:[UtilityService,AuthenService],
  declarations: [MainComponent]
})
export class MainModule { }
