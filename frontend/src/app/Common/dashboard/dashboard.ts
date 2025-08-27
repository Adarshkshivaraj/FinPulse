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
import { NgChartsModule } from 'ng2-charts';

import { BaseChartDirective } from 'ng2-charts'; // ✅ Use directive directly
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  userName = 'Adarsh';

  summaryCards = [
    { title: 'Total Balance', value: 125000 },
    { title: 'Monthly Spend', value: 45000 },
    { title: 'Investments', value: 80000 }
  ];

  // ✅ Pie chart data
  expenseChartLabels = ['Food', 'Travel', 'Shopping', 'Bills', 'Others'];
  expenseChartData = [12000, 8000, 5000, 7000, 3000];

  // ✅ Line chart data
  trendChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  trendChartData = [
    { data: [20000, 25000, 18000, 22000, 30000], label: 'Expenses' }
  ];
}
