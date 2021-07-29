import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MediaDto} from "../../_models/media-dto";
import {FileUploadService} from "../../_services/file-upload.service";

@Component({
  selector: 'hc-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  files: any[] = [];

  @Input() mediaList: MediaDto[] = [];
  @Input() allowMultipleFiles: boolean = false;
  @Output() onUploadSuccessful = new EventEmitter<any>();

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onFileDropped(files: FileList) {

    let fileArray: File[] = [];

    if(this.allowMultipleFiles){
      for (let i=0; i< files.length; i++) {
        const item = files.item(i);
        if (item) {
          fileArray.push(item);
        }
      }
    } else {
      const item = files.item(0);
      if (item) {
        fileArray.push(item);
      }
    }
    this.prepareFilesList(fileArray)
  }

  fileBrowseHandler(event: any) {
    if(event.target.files && event.target.files.length > 0){
      if(this.allowMultipleFiles){
        this.prepareFilesList(event.target.files);
      } else {
        this.prepareFilesList([event.target.files[0]]);
      }
    }
  }

  private prepareFilesList(files: Array<any>) {
    //clearing the file array, because we only allow one File, so it must override the current file when we drag it there
    if(!this.allowMultipleFiles) {
      this.files = [];
    }
    // we fill the preview url so we can display the image before the uploading
    const reader = new FileReader();
    for (const file of files) {
      this.files.push(file);

      reader.readAsDataURL(file); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if (event.target) {
          file.preview = event.target['result'];
        }
      };
    }
    this.uploadFiles();
  }

  uploadFiles() {
    const _that = this;
    for (const file of this.files) {
      this.fileUploadService.uploadFile(file).subscribe((response: any)=> {
        if(!_that.mediaList || !this.allowMultipleFiles){
          _that.mediaList = [];
        }
        _that.mediaList?.push(response);
        if(!this.allowMultipleFiles) {
          _that.onUploadSuccessful.emit(this.mediaList[0]);
        } else {
          _that.onUploadSuccessful.emit(this.mediaList);
        }
      });
    }
  }

  getBackgroundImg(): string {
    let preview = '';
    if(!this.allowMultipleFiles) {
      if(this.files.length > 0) {
        preview = this.files[0].preview;
      } else if(this.mediaList && this.mediaList.length > 0) {
        preview = this.mediaList[0].url ? this.mediaList[0].url : preview;
      }
    }
    return preview;
  }
}
