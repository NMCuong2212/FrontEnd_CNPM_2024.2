import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageShopComponent } from './manage-shop/manage-shop.component';
import { ManageUserComponent } from './manage-user/manage-user.component';


export const MaterialRoutes: Routes = [
    {
        path:'category',
        component:ManageCategoryComponent,
        canActivate:[RouteGuardService],
        data:{
            expectelRole:['admin']
        }
    },

    {
        path:'product',
        component:ManageProductComponent,
        canActivate:[RouteGuardService],
        data:{
            expectelRole:['admin']
        }
    },

    {
        path:'order',
        component:ManageOrderComponent,
        canActivate:[RouteGuardService],
        data:{
            expectelRole:['admin','user']
        }
    },

    {
        path:'shop',
        component:ManageShopComponent,
        canActivate:[RouteGuardService],
        data:{
            expectelRole:['admin','user']
        }
    },

    {
        path: 'user',
        component: ManageUserComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    
    

];
