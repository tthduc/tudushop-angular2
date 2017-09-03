import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
export const MainRoutes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'product', loadChildren: './product/product.module#ProductModule' },
            { path: 'product-category', loadChildren: './product-category/product-category.module#ProductCategoryModule' },
            { path: 'role', loadChildren: './role/role.module#RoleModule' },
            { path: 'function', loadChildren: './function/function.module#FunctionModule' }
        ]
    }
]