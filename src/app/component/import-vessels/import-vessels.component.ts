import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VesselsService} from '../../service/vessels.service';
import {Message} from '../../model/message';
import {Vessels} from '../../model/vessels';
import {CsvStructure} from '../../model/csv-structure';

@Component({
  selector: 'app-import-vessels',
  templateUrl: './import-vessels.component.html',
  styleUrls: ['./import-vessels.component.scss']
})
export class ImportVesselsComponent implements OnInit {
  vessels: Vessels;

  constructor(private vesselsService: VesselsService) {
  }

  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;
  files: any[] = [];

  ngOnInit(): void {
    this.vesselsService.currentVessels.subscribe(vessels => this.vessels = vessels);
  }

  onFileDropped($event): void {
    this.prepareFilesList($event);
  }

  deleteFile(index: number): void {
    if (this.files[index].progress < 100) {
      return;
    }
    this.vessels = new Vessels();
    this.vesselsService.changeAllVesselsSet(this.vessels);
    this.files.splice(index, 1);
  }

  uploadFiles(index: number): void {
    const fileReader = new FileReader();
    let nbLine: number;
    let csvStructure: CsvStructure;
    fileReader.onload = () => {
      this.vessels = new Vessels();
      const lines: string[] = (fileReader.result as string).split('\n');
      nbLine = lines.length;
      for (let line of lines) {
        line = line.replace(/[^\x20-\x7F]/g, '');
        const splitLine = line.split(',');
        if (isNaN(Number(splitLine[0])) || line === '') {
          csvStructure = new CsvStructure(splitLine);
          continue;
        }
        const newMessage = new Message(splitLine, csvStructure);
        this.vessels.addMessage(newMessage);
      }
      this.vessels.sortAllMessageInVesselByDate();
      this.vessels.sortAllTraceInVesselByDate();
      this.vesselsService.changeAllVesselsSet(this.vessels);
    };

    fileReader.onprogress = (e) => {
      if (e.lengthComputable) {
        this.files[index].progress = Math.round(((e.loaded / e.total) * 100));
      }
    };

    fileReader.readAsText(this.files[index]);
  }

  fileBrowseHandler(files): void {
    this.prepareFilesList(files);
  }


  formatBytes(bytes, decimals = 2): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  prepareFilesList(files: Array<any>): void {
    this.files = [];
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFiles(0);
  }
}
