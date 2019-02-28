import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FirstKeyPipe } from './pipes/first-key.pipe';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    FirstKeyPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FirstKeyPipe
  ],
  providers: [
    AuthService,
    StorageService
  ]
})
export class SharedModule { }
