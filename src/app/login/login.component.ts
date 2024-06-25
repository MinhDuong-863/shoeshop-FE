import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginDTO } from '../dtos/user/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  phone: string;
  password: string;
  role: number;
  isPasswordVisible: boolean;

  constructor(private router: Router, private userService: UserService){
    this.phone='';
    this.password = '';
    this.role = 2;
    this.isPasswordVisible = false;
  }

  login(){
    const loginDTO: LoginDTO = {
      "phone_number": this.phone,
      "password": this.password,
    }
    this.userService.login(loginDTO).subscribe({
      next: (response: any) => {
        debugger
        //this.router.navigate(['/login']);
      }, complete: () => {
        debugger
      },
      error: (error: any) => {
        // Xử lý lỗi nếu có
        debugger
        console.error('Đăng ký không thành công:', error);
      }
    })
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  containsOnlyNumbers(str: string): boolean {
    return /^\d+$/.test(str);
  }  
}
