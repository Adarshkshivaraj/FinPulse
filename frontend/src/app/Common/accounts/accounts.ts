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
  selector: 'app-accounts',
  imports: [CommonModule, MatSidenavModule, MatCardModule, MatTableModule, MatChipsModule, MatListModule, MatIconModule, MatToolbarModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss'
})
export class Accounts {
  accounts = [
    { name: 'Savings Account', balance: 85000, type: 'Savings' },
    { name: 'Credit Card', balance: -12000, type: 'Credit' },
    { name: 'Investment Portfolio', balance: 42000, type: 'Investment' }
  ];
}
