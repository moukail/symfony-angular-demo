import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ChannelStore } from '../../stores/channel.store';
import { Channel } from '../../models/channel.model';

@Component({
  selector: 'app-channel-new',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './channel-new.component.html',
  styleUrl: './channel-new.component.scss'
})
export class ChannelNewComponent {
  private fb = inject(FormBuilder);
  private store = inject(ChannelStore);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['TV' as 'TV' | 'Radio', Validators.required],
    country: ['', Validators.required],
    language: ['', Validators.required],
    website: ['', Validators.required],
    logo: ['', Validators.required],
    active: [true]
  });

  onSubmit() {
    if (this.form.valid) {
      const channel = this.form.getRawValue() as Omit<Channel, 'id'>;
      this.store.add(channel);
    }
  }
}
