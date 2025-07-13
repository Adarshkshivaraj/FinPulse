import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatSidenavModule, MatCardModule, MatTableModule, MatChipsModule, MatListModule, MatIconModule, MatToolbarModule,ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  userName = 'Adarsh';
  summaryCards = [
    { title: 'Total Balance', value: 125000 },
    { title: 'Monthly Spend', value: 45000 },
    { title: 'Investments', value: 80000 }
  ];
}
