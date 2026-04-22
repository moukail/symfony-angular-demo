import { Component, inject } from "@angular/core";
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  imports: [
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class StepperComponent {
  private _formBuilder = inject(FormBuilder);

  macAddressFormGroup = this._formBuilder.group({
    macAddress: ['', Validators.required],
  });

  typeFormGroup = this._formBuilder.group({
    type: ['', Validators.required],
  });

  playlistFormGroup = this._formBuilder.group({
    m3uPlaylist: [''],
    xtreamCodeUrl: [''],
    xtreamCodeUsername: [''],
    xtreamCodePassword: [''],
  });

  onSubmit() {
    console.log(this.macAddressFormGroup.value);
    console.log(this.typeFormGroup.value);
    console.log(this.playlistFormGroup.value);
  }
}