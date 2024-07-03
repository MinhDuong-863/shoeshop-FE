import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginResponse} from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  phone: string;
  password: string;
  isPasswordVisible: boolean;
  roleBegin: number;

  roles: Role[] = [];
  rememberMe: boolean;
  selectedRole: Role | undefined;

  constructor(
    private router: Router, 
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ){
    this.phone='';
    this.password = '';
    this.isPasswordVisible = false;
    this.roleBegin = -1;
    this.rememberMe = false;
  }

  ngOnInit(){
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0]: undefined;
      },
      error: (error: any) => {
        debugger
        console.error('Error getting roles: ', error);
      }
    });
  }

  login(){
    const loginDTO: LoginDTO = {
      "phone_number": this.phone,
      "password": this.password,
    }
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        const {token} = response
        if(this.rememberMe){
          this.tokenService.setToken(token);  
        }
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
