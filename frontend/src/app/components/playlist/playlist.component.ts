import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { M3uRequest, PlaylistRequest, XtreamRequest } from "../../models";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  standalone: true,
})
export class PlaylistComponent implements OnInit {

  private apiService = inject(ApiService);
  private _formBuilder = inject(FormBuilder);

  isLoading = signal(false);
  isSuccessfull = signal(false);

  playlistForm = this._formBuilder.group({
    macAddress: ['', [Validators.required, Validators.pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)]],
    type: ['m3u', Validators.required],
    name: ['', Validators.required],
    url: ['', Validators.required],
    username: [''],
    password: [''],
  });

  ngOnInit() {
    this.playlistForm.get('type')?.valueChanges.subscribe(type => {
      this.updateValidators(type!);
    });

    this.updateValidators(this.playlistForm.get('type')?.value!);
  }

  private updateValidators(type: string) {

    const username = this.playlistForm.get('username');
    const password = this.playlistForm.get('password');

    if (type === 'm3u') {
      username?.clearValidators();
      password?.clearValidators();
    } else if (type === 'xtream') {
      username?.setValidators([Validators.required]);
      password?.setValidators([Validators.required]);
    }

    username?.updateValueAndValidity({ emitEvent: false });
    password?.updateValueAndValidity({ emitEvent: false });
  }

  onSubmit() {

    this.isLoading.set(true);

    let v: M3uRequest | XtreamRequest;
    if (this.playlistForm.value.type === 'm3u') {
      v = this.playlistForm.value as M3uRequest;
    } else {
      v = this.playlistForm.value as XtreamRequest;
    }

    this.apiService.addPlaylist(v).subscribe({
      next: (response) => {
        console.log('Playlist added successfully:', response);
        this.isLoading.set(false);
        this.isSuccessfull.set(true);
      },
      error: (error) => {
        console.error('Error adding playlist:', error);
        this.isLoading.set(false);
      }
    });
  }

  resetForm() {
    this.playlistForm.reset();
    this.isSuccessfull.set(false);
  }
}