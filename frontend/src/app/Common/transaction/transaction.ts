import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-transaction',
  imports: [CommonModule, MatSidenavModule, MatCardModule, MatTableModule, MatChipsModule, MatListModule, MatIconModule, MatToolbarModule, ReactiveFormsModule, CommonModule
    ,MatFormFieldModule,MatInputModule,FormsModule
  ],
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss'
})
export class Transaction {
  searchQuery = '';
  displayedColumns = ['date', 'description', 'amount', 'status'];
  transactions = [
    { date: 'Jul 10', description: 'Grocery Store', amount: 1200, status: 'Completed' },
    { date: 'Jul 9', description: 'Electricity Bill', amount: 2500, status: 'Pending' },
    { date: 'Jul 8', description: 'Netflix Subscription', amount: 499, status: 'Completed' }
  ];

  get filteredTransactions() {
    return this.transactions.filter(txn =>
      txn.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
