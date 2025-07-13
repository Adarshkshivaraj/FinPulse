import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-settings',
  imports: [CommonModule, MatSidenavModule, MatCardModule, MatTableModule, MatChipsModule, MatListModule, MatIconModule, MatToolbarModule, ReactiveFormsModule, CommonModule
    , MatFormFieldModule, MatInputModule, FormsModule, MatExpansionModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {

}
