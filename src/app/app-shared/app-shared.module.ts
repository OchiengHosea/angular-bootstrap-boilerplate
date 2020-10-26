import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeCaseToWordPipe, ObjectKeysPipe, NumToCurrencyPipe, KeyToWordPipe } from './pipes/shared-pipes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SnakeCaseToWordPipe, ObjectKeysPipe, NumToCurrencyPipe, KeyToWordPipe,
  ],
  imports: [
    CommonModule, MatButtonModule,
    MatDialogModule, ReactiveFormsModule, FormsModule
  ],
  exports: [
    SnakeCaseToWordPipe, ObjectKeysPipe, NumToCurrencyPipe, KeyToWordPipe,
    MatDialogModule, ReactiveFormsModule, FormsModule, MatButtonModule
  ]
})
export class AppSharedModule { }
