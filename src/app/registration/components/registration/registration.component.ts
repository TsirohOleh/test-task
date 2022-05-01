import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { getValidators } from '../../helpers/validation.helper';
import { FieldValidation, RegistrationField, RegistrationRequest } from '../../services/registration.model';
import { RegistrationService } from '../../services/registretion.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  readonly passwordtype = 'password';

  registrationFields$: Observable<RegistrationField[]> = this.registrationService.getRegistrationFields();
  registrationFields: RegistrationField[] | undefined;
  registrationForm: FormGroup = this.fb.group({});
  isPasswordVisible = false;

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registrationFields$
      .pipe(take(1))
      .subscribe((fields: RegistrationField[]): void => {
        this.registrationFields = fields;
        fields.forEach(({name, validations, required}: RegistrationField): void => {
          const validators: ValidatorFn[] = getValidators(validations as FieldValidation[]);

          if (required) {
            validators.push(Validators.required);
          }

          this.registrationForm.addControl(name, this.fb.control('', validators));
        });
      });
  }

  isInvalid(name: string): boolean {
    const control = this.registrationForm.get(name);
  
    return !control?.valid && !!(control?.touched || control?.dirty);
  }

  isPassword(name: string): boolean {
    return name === this.passwordtype;
  }

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    const reqBody: RegistrationRequest = {};

    Object.keys(this.registrationForm.controls).forEach((controlName: string): void => {
      reqBody[controlName] = this.registrationForm.get(controlName)?.value;
    });

    this.registrationService.register(reqBody)
      .pipe(take(1))
      .subscribe((): void => {
        this.router.navigate(['/welcome']);
      })
  }
}
