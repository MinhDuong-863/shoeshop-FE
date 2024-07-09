import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginResponse} from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { UserResponse } from '../../responses/user/user.response';

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

  userResponse?: UserResponse;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router, 
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ){
    this.phone='';
    this.password = '';
    this.isPasswordVisible = false;
    this.roleBegin = 2;
    this.rememberMe = true;
  }

  ngOnInit(){
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.find(role => role.id === 2);
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
          debugger
          this.userService.getUserDetails(token).subscribe({
            next: (response: any) => {
              debugger
              this.userResponse = {
                id: response.id,
                fullname: response.fullname,
                address: response.address,
                is_active: response.is_active,
                date_of_birth: new Date(response.date_of_birth),
                facebook_account_id: response.facebook_account_id,
                google_account_id: response.google_account_id,
                role: response.role
              };
              this.userService.saveUserToLocalStorage(this.userResponse);
              this.router.navigate(['/']);
            },complete: () => {
              debugger
            },error: (error: any) => {
              debugger
              alert(error.error.message);
            }
          });
        }
        
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
  registerClick() {
    this.router.navigate(['/register']);
  }
}
