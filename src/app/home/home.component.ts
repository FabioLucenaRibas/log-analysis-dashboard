import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import { LogObject } from '../model/LogObject.model';

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

  public async dropped(filesDrop: NgxFileDropEntry[]) {
    var titleFiles: string[] = [];
    this.title.setTitle('LogAnalysisDashboard');
    this.logs = [];

    for (const droppedFile of filesDrop) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        await fileEntry.file(async (file: File) => {
          await this.readFile(file).then(
            result => {
              if (result != undefined && result.length > 0) {
                titleFiles.push(file.name);
                this.logs = this.logs.concat(result);
              }
            },
            reason => {
              console.log("Erro ao ler arquivo, %s", reason);
            }
          );
        });

      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

    if (this.logs.length > 0) {
      let title = titleFiles.join('; ');
      this.title.setTitle(title.substring(0, 75).concat(title !== undefined &&
        title.length > 75 ? '...' : ''));
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

  private readFile(file: File) {
    return new Promise<LogObject[]>((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = () => {
        var logRecord: LogObject[] = []
        if (fr.result != null) {
          const result = fr.result.toString().split("\n")

          for (var line of result) {
            try {
              var log: LogObject = JSON.parse(line);
              log['@timestamp'] = new Date(log['@timestamp']);
              log.id = uuidv4();
              logRecord.push(log)
            } catch (e) {
            }
          }
        }

        resolve(logRecord)
      };

      fr.onerror = reject;
      fr.readAsText(file);
    });
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

}
