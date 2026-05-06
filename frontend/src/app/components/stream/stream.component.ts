import { AfterViewInit, Component, inject, OnInit, ViewChild, effect } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Stream } from '../../models/stream.model';
import { StreamStore } from '../../stores/stream.store';

@Component({
    selector: 'app-stream',
    standalone: true,
    templateUrl: './stream.component.html',
    styleUrl: './stream.component.scss',
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatMenuModule,
        MatDialogModule
    ],
})
export class StreamComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns = ['mime_type', 'source', 'type', 'url', 'drm', 'id'];
    dataSource = new MatTableDataSource<Stream>([]);

    readonly store = inject(StreamStore);
    private route = inject(ActivatedRoute);
    private dialog = inject(MatDialog);

    constructor() {
        effect(() => {
            this.dataSource.data = this.store.entities();
        });
    }

    ngOnInit(): void {
        const channelId = this.route.snapshot.paramMap.get('id');
        if (channelId) {
            this.store.loadByChannel(channelId);
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    deleteStream(id: string): void {
        if (confirm('Are you sure you want to delete this stream?')) {
            this.store.delete(id);
        }
    }
}
