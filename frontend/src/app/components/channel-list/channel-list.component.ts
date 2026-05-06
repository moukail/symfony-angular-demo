import { AfterViewInit, Component, inject, OnInit, ViewChild, effect } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Channel } from '../../models/channel.model';
import { ChannelStore } from '../../stores/channel.store';
import { ChannelDeleteComponent } from '../channel-delete/channel-delete';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatDialogModule,
    ChannelDeleteComponent
  ],
})
export class ChannelListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['name', 'type', 'country', 'language', 'active', 'id'];
  dataSource = new MatTableDataSource<Channel>([]);

  readonly store = inject(ChannelStore);
  readonly dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.entities();
    });
  }

  ngOnInit(): void {
    this.store.loadAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  channelDialog(channel: Channel): void {

  }

  deleteDialog(channel: Channel): void {
    let dialogRef = this.dialog.open(ChannelDeleteComponent, {
      width: '600px',
      data: channel
    });

    dialogRef.componentInstance.event.subscribe((result) => {
      this.store.delete(result.data);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
