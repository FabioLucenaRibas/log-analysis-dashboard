import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { LogObject } from '../model/LogObject.model';
import { v4 as uuidv4 } from 'uuid';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  constructor(
    private router: Router,
    private title: Title,
    private messageService: MessageService,
  ) { 
    title.setTitle('LogAnalysisDashboard');
  }

  logs: LogObject[] = [];
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.logs = [];

    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.title.setTitle(file.name);
          const fileReader = new FileReader();
          fileReader.onload = (e) => {

            if (fileReader.result != null) {
              const result = fileReader.result.toString().split("\n")

              for (var line of result) {
                try {
                  var log: LogObject = JSON.parse(line);
                  log['@timestamp'] = new Date(log['@timestamp']);
                  log.id = uuidv4();
                  this.logs.push(log)
                } catch (e) {
                }
              }

              if (this.logs.length > 0) {
                this.router.navigateByUrl('dashboard', {
                  state: { data: { logs: this.logs } }
                });
              } else {
                this.messageService.add({
                  severity: 'info',
                  summary: 'Informação',
                  detail: 'Nenhum registro encontrado'
                });
              }

            }
          };
          fileReader.readAsText(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

}
