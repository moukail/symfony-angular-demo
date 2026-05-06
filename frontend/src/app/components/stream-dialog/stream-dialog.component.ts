import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Stream } from '../../models/stream.model';

@Component({
  selector: 'app-stream-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.stream ? 'Edit' : 'Add' }} Stream</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="stream-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Stream URL</mat-label>
          <input matInput formControlName="url" placeholder="https://...">
          <mat-error *ngIf="form.get('url')?.hasError('required')">URL is required</mat-error>
        </mat-form-field>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Type</mat-label>
            <mat-select formControlName="type">
              <mat-option value="hls">HLS</mat-option>
              <mat-option value="dash">DASH</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Source</mat-label>
            <input matInput formControlName="source" placeholder="e.g. website, akamai">
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>MIME Type</mat-label>
          <input matInput formControlName="mime_type" placeholder="application/x-mpegURL">
        </mat-form-field>

        <div class="drm-section">
          <mat-checkbox formControlName="drm">Enable DRM</mat-checkbox>
          
          <mat-form-field appearance="outline" class="full-width" *ngIf="form.get('drm')?.value">
            <mat-label>DRM License URL</mat-label>
            <input matInput formControlName="drm_license">
          </mat-form-field>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="onSubmit()">
        {{ data.stream ? 'Save' : 'Add' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .stream-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
    }
    .full-width {
      width: 100%;
    }
    .row {
      display: flex;
      gap: 16px;
      
      mat-form-field {
        flex: 1;
      }
    }
    .drm-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 8px;
    }
  `]
})
export class StreamDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StreamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stream?: Stream, channelId: string }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      url: [this.data.stream?.url || '', [Validators.required]],
      type: [this.data.stream?.type || 'hls', [Validators.required]],
      source: [this.data.stream?.source || 'website'],
      mime_type: [this.data.stream?.mime_type || 'application/x-mpegURL'],
      drm: [this.data.stream?.drm || false],
      drm_license: [this.data.stream?.drm_license || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
