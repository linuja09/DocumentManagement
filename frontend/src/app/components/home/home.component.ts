import { FileUploaderService } from '../../Services/file-uploader.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fileContent;
  fileName;
  fileDescription;
  fileType;
  error;

  uploadResponse;

  constructor(
    private uploadService: FileUploaderService
  ) { }

  ngOnInit(): void {
  }

  handleFileUpload() {
    let userID = 1
    let payLoad = {
      fileContent: this.fileContent,
      fileName: this.fileName,
      fileDescription: this.fileDescription,
      fileType: this.fileType,
    }

    this.uploadService.upload(payLoad, userID).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );

    console.log(payLoad)
  }

}
