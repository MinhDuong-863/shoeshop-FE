import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './components/app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component'; // Import HeaderComponent here
import { OrderDetailComponent } from './components/order-detail/order.detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SidebarUserComponent } from './components/sidebar-user/sidebar-user.component';
import { RouterModule } from '@angular/router';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailProductComponent,
    LoginComponent,
    OrderComponent,
    OrderDetailComponent,
    RegisterComponent,
    AppComponent,
    UserAccountComponent,
    MyOrdersComponent,
    // Remove HeaderComponent from declarations as it's standalone
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    UserProfileComponent,
    FooterComponent,
    HeaderComponent, // Import HeaderComponent here
    RouterModule,
    SidebarUserComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
