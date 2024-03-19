import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importe NgForm
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../vm/UserData.vm';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})

export class CadastroComponent implements OnInit, AfterViewInit {
  titulo: string | undefined;
  user: UserData | undefined;
  name!: string;
  @ViewChild('form') form: NgForm | undefined;

  constructor(
    public dialogRef: MatDialogRef<CadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dataSource: MatTableDataSource<any>, item: UserData, tituloModal: string }
  ) { }

  ngOnInit(): void {
    this.titulo = this.data.tituloModal;
    this.user = this.data.item;
  }

  ngAfterViewInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(formValue: any): void {
    if (formValue.name == '' || formValue.namePet == '' || formValue.vaccine == '') return;
    this.dialogRef.close(formValue);
  }
}
