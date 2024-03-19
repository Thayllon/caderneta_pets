import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UserData } from './../vm/UserData.vm';

import { MatTableDataSource } from '@angular/material/table';
import { CadastroComponent } from '../cadastro/cadastro.component';

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

const NAMES_PET: string[] = [
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
];

const NAMES_VACCINE: string[] = [
  'Vacina V8 ou V10 (Polivalente)',
  'Vacina contra a Raiva',
  'Vacina contra a Tosse dos Canis (Bordetella)',
  'Vacina contra a Leptospirose',
  'Vacina contra a Leishmaniose',
  'Vacina contra a Parainfluenza',
  'Vacina contra a Hepatite Infecciosa Canina (Adenovírus Canino Tipo 1)',
  'Vacina contra a Parvovirose',
  'Vacina contra a Cinomose',
  'Vacina contra a Giardíase'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'namePet', 'vaccine', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    const users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));

    this.dataSource = new MatTableDataSource(users);
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

  createNewUser(id: number): UserData {
    return {
      id: id.toString(),
      name: NAMES[Math.round(Math.random() * (NAMES.length - 1))],
      namePet: NAMES_PET[Math.round(Math.random() * (NAMES_PET.length - 1))],
      vaccine: NAMES_VACCINE[Math.round(Math.random() * (NAMES_VACCINE.length - 1))]
    };
  }

  adicionar() {
    const dialogRef = this.dialog.open(CadastroComponent, {
      data: { dataSource: this.dataSource, tituloModal: 'Adicionar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.dataSource.data.length + 1;
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  editar(row: UserData) {
    const dialogRef = this.dialog.open(CadastroComponent, {
      data: { dataSource: this.dataSource, tituloModal: 'Editar', item: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = row.id;
        const index = this.dataSource.data.findIndex(user => user.id === result.id);
        this.dataSource.data[index] = result;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  excluir(id: string) {
    this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
  }

  exportar() {
    const doc = new jsPDF('l', 'mm', 'a4');

    const head = [['ID', 'Dono', 'Pet', 'Vacina']];
    const data = this.dataSource.data.map(user => [user.id, user.name, user.namePet, user.vaccine]);

    autoTable(doc, {
      head: head,
      body: data,
      didDrawCell: (data) => { },
    });

    doc.save('table.pdf');
  }
}

