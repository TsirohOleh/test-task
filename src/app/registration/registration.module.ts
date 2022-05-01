import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './components/registration';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './services/registretion.service';

@NgModule({
  providers: [RegistrationService],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule {}
