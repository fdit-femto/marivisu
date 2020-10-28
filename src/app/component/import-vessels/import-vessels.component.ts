import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VesselsService} from '../../service/vessels.service';
import {Message} from '../../model/message';

@Component({
  selector: 'app-import-vessels',
  templateUrl: './import-vessels.component.html',
  styleUrls: ['./import-vessels.component.scss']
})
export class ImportVesselsComponent implements OnInit {
  vessels: Map<number, Message>;


  constructor(private vesselsService: VesselsService) {
  }

  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;
  files: any[] = [];

  ngOnInit(): void {
    this.vesselsService.currentVessels.subscribe(vessels => this.vessels = vessels);
  }

  /**
   * on file drop handler
   */
  onFileDropped($event): void {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files): void {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number): void {
    if (this.files[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
  }


  uploadFilesSimulator(index: number): void {
    const fileReader = new FileReader();
    let nbLine: number;

    fileReader.onload = (e) => {
      const lines: string[] = (fileReader.result as string).split('\n');
      nbLine = lines.length;
      for (const line of lines) {
        const splitLine = line.split(',');
        const newVessel = new Message(splitLine);
        this.vessels.set(Number(newVessel.mmsi), newVessel);
      }
      this.vesselsService.changeVesselsSet(this.vessels);
    };

    fileReader.onprogress = (e ) => {
      if (e.lengthComputable) {
        this.files[index].progress = Math.round(((e.loaded / e.total) * 100));
      }
    };

    fileReader.readAsText(this.files[index]);
  }

  prepareFilesList(files: Array<any>): void {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFilesSimulator(0);
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
}
