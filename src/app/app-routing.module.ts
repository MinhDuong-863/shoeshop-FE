import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order.detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products/:id', component: DetailProductComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'orders/:id', component: OrderDetailComponent},
  {path: 'user-account', component: UserAccountComponent, 
    children: [
      {path: 'user-profile', component: UserProfileComponent},
      {path: 'my-orders', component: MyOrdersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
