import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RegisterDTO } from '../dtos/resgister.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  //Khai báo biến tương ứng với trường dữ liệu trên form
  phone: string;
  password: string;
  retypepassword: string;
  fullname: string;
  province: string;
  district: string;
  commune: string;
  street: string;
  dob: Date | null;
  gender: number;
  isAccepted: boolean;
  isPasswordVisible: boolean;
  isRetypePasswordVisible: boolean;

  constructor(private router: Router, private userService: UserService) {
    this.phone = '';
    this.password = '';
    this.retypepassword = '';
    this.fullname = '';
    this.province = '';
    this.district = '';
    this.commune = '';
    this.street = '';
    this.dob = null;
    this.gender = -1;
    this.isAccepted = false;
    this.isPasswordVisible = false;
    this.isRetypePasswordVisible = false;
    //inject
  }
  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`)
  }
  register() {
    const message = `phone: ${this.phone}` + `password: ${this.password}`
      + `retypepassword: ${this.retypepassword}` + `fullname: ${this.fullname}`
      + `province: ${this.province}` + `district: ${this.district}`
      + `commune: ${this.commune}` + `street: ${this.street}`
      + `dob: ${this.dob}` + `gender: ${this.gender}`
      + `isAccepted: ${this.isAccepted}`;
    //alert(message);

    
    const registerDTO: RegisterDTO = {
      "fullname": this.fullname,
      "phone_number": this.phone,
      "address": this.street + ", " + this.commune + ", " + this.district + ", " + this.province,
      "password": this.password,
      "retype_password": this.retypepassword,
      "date_of_birth": this.dob,
      "gender": this.gender,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 2
    }
    
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        this.router.navigate(['/login']);
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
  toggleRetypePasswordVisibility(): void {
    this.isRetypePasswordVisible = !this.isRetypePasswordVisible;
  }
  containsNumber(str: string): boolean {
    return /\d/.test(str);
  }
  containsSpecialCharacter(str: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(str);
  }
  containsOnlyNumbers(str: string): boolean {
    return /^\d+$/.test(str);
  }  
  checkAge() {
    if (this.dob != null) {
      const dobControl = this.registerForm.form.controls['dob'];
      const dobValue = new Date(this.dob);
      const today = new Date();
      let age = today.getFullYear() - dobValue.getFullYear();
      const monthDifference = today.getMonth() - dobValue.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < dobValue.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        dobControl.setErrors({ 'invalidAge': true });
      } else {
        dobControl.setErrors(null); // Xóa lỗi nếu không có lỗi
      }
      dobControl.markAsTouched();
    }
  }
}
