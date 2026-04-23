import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import { selectAllUsers, selectLoading, selectTotal } from '../../selectors/users.selectors';
import { loadUsers } from '../../actions/users.actions';
import { User } from '../../models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [MatTableModule, MatPaginatorModule, AsyncPipe, DatePipe],
})
export class UserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['email', 'role', 'createdAt', 'updatedAt'];

  dataSource = new MatTableDataSource<User>([]);

  private store = inject(Store);

  total$ = this.store.select(selectTotal);
  loading$ = this.store.select(selectLoading);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.store.dispatch(loadUsers({ page: 1 }));
    this.store.select(selectAllUsers).subscribe(users => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.store.dispatch(loadUsers({
      page: event.pageIndex + 1
    }));
  }
}
