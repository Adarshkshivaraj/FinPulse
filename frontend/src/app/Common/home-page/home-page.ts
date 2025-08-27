import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatSidenavModule, MatCardModule, MatTableModule, MatChipsModule, MatListModule, MatIconModule, MatToolbarModule, RouterModule],
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  userName = 'Adarsh';
  constructor(private router: Router) {
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
