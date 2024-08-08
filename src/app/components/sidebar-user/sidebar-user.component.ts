import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrl: './sidebar-user.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarUserComponent {

}
