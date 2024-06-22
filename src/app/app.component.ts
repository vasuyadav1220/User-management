import { Component,AfterViewInit,ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditUserComponent, UserData } from './edit-user/edit-user.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<UserData>;
  userForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    const users = USERS;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);

    // Initialize the form
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: UserData = this.userForm.value;
      this.dataSource.data = [...this.dataSource.data, newUser];
      this.userForm.reset();
    }
  }

  openEditDialog(user: UserData): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '300px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(u => u.email === result.email);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
        }
      }
    });
  }

  openConfirmDialog(user: UserData): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(u => u.email !== user.email);
      }
    });
  }
}

const USERS: UserData[] = [
  { username: 'Maia', email: 'maia@example.com', role: 'admin' },
  { username: 'Asher', email: 'asher@example.com', role: 'user' },
  { username: 'Olivia', email: 'olivia@example.com', role: 'user' },
  { username: 'Atticus', email: 'atticus@example.com', role: 'admin' },
  { username: 'Amelia', email: 'amelia@example.com', role: 'user' },
  { username: 'Jack', email: 'jack@example.com', role: 'user' },
  { username: 'Charlotte', email: 'charlotte@example.com', role: 'admin' },
  { username: 'Theodore', email: 'theodore@example.com', role: 'user' },
  { username: 'Isla', email: 'isla@example.com', role: 'user' },
  { username: 'Oliver', email: 'oliver@example.com', role: 'admin' },
  { username: 'Isabella', email: 'isabella@example.com', role: 'user' },
  { username: 'Jasper', email: 'jasper@example.com', role: 'user' },
  { username: 'Cora', email: 'cora@example.com', role: 'admin' },
  { username: 'Levi', email: 'levi@example.com', role: 'user' },
  { username: 'Violet', email: 'violet@example.com', role: 'user' },
  { username: 'Arthur', email: 'arthur@example.com', role: 'admin' },
  { username: 'Mia', email: 'mia@example.com', role: 'user' },
  { username: 'Thomas', email: 'thomas@example.com', role: 'user' },
  { username: 'Elizabeth', email: 'elizabeth@example.com', role: 'admin' },
];