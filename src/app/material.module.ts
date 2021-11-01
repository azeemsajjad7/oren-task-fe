import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

const MaterailComponent = [
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule,
];

@NgModule({
  imports: [MaterailComponent],
  exports: [MaterailComponent],
})
export class MaterialModule {}
