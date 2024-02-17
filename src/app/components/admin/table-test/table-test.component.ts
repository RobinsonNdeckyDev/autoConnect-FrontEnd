import { Component, OnInit } from '@angular/core';
declare var $: any; // Déclaration de jQuery pour TypeScript


@Component({
  selector: 'app-table-test',
  templateUrl: './table-test.component.html',
  styleUrls: ['./table-test.component.css'],
})
export class TableTestComponent {
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

}
