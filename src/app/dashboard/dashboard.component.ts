import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { Table } from 'primeng/table';
import { LogObject } from '../model/LogObject.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @ViewChild("dt1") dataTableComponent!: Table;
  @ViewChild("filtro") filtro!: ElementRef;

  data: any;
  logs: LogObject[] = [];
  editorOptions = { theme: 'vs-dark', language: 'json' };

  cols: any[] = [];
  _selectedColumns: any[] = [];

  defaultSelection: any[] = [];

  constructor(
    private router: Router,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav?.extras?.state?.['data'];
  }

  ngOnInit(): void {
    this.carregarLogs();
    this.carregarMultiSelect();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  carregarLogs() {
    this.logs = this.data?.logs
  }

  carregarMultiSelect() {
    this.defaultSelection = [
      { field: 'log.level', header: 'log.level' },
      { field: 'service.name', header: 'service.name' },
      { field: 'message', header: 'message' }
    ];

    this.cols = [];

    for (let elements of this.defaultSelection.values()) {
      this.cols.push(elements);
    }

    this.cols.push(
      { field: '@version', header: '@version' },
      { field: 'ecs.version', header: 'ecs.version' },
      { field: 'user.name', header: 'user.name' },
      { field: 'canal', header: 'canal' },
      { field: 'service.version', header: 'service.version' },
      { field: 'container.name', header: 'container.name' },
      { field: 'tags', header: 'tags' },
      { field: 'tracing.uuid', header: 'tracing.uuid' },
      { field: 'tracing.request_id', header: 'tracing.request_id' },
      { field: 'tracing.idSessaoFrwk', header: 'tracing.idSessaoFrwk' },
      { field: 'log.logger', header: 'log.logger' },
      { field: 'error.stack_hash', header: 'error.stack_hash' },
      { field: 'error.stack_trace', header: 'error.stack_trace' }
    );

    this._selectedColumns = this.defaultSelection;
  }

  clear(table: Table) {
    table.clear();
    table.sortField = "@timestamp";
    table.sortOrder = -1;
    table.sortSingle();
    this.filtro.nativeElement.value = '';
    this._selectedColumns = this.defaultSelection;
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    editor.updateOptions({
      readOnly: true,
      wordWrap: 'on'
    });
  }
}
