import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Channel } from '../../models/channel.model';

@Component({
  selector: 'app-channel-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Delete Channel</h2>
    <mat-dialog-content>
      Are you sure you want to delete the channel <strong>{{ data.name }}</strong>?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onDelete()">Delete</button>
    </mat-dialog-actions>
  `
})
export class ChannelDeleteComponent {
  @Output() event = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<ChannelDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Channel
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.event.emit({ data: this.data.id });
    this.dialogRef.close();
  }
}
