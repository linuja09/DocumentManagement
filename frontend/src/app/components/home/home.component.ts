import { TokenService } from './../../Services/token.service';
import { FileUploaderService } from '../../Services/file-uploader.service';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

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
  uploadedTo;

  uploadResponse;

  users;
  userDocs;


  constructor(
    private uploadService: FileUploaderService,
    private cd: ChangeDetectorRef,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.uploadService.getUsers().subscribe(
      data => this.users = data
    )
    this.uploadService.getUserDocuments(this.tokenService.get()).subscribe(
      data => {
        this.userDocs = data;
        console.log(data);
      }
    )
  }

  getFileLink(fileID){
    return this.uploadService.getResource(fileID);
  }

  onSelectImage(event) {
    this.fileContent = event.srcElement.files[0];
  }
  handleFileUpload() {
    const uploadData = new FormData();
    uploadData.append('fileContent', this.fileContent, this.fileContent.name);
    uploadData.append('fileName', this.fileContent.name );
    uploadData.append('fileDescription', this.fileDescription);
    uploadData.append('fileType', this.fileType);
    uploadData.append('token', this.tokenService.get());
    uploadData.append('uploadedTo', this.uploadedTo);

    this.uploadService.upload(uploadData).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );

  }

}
