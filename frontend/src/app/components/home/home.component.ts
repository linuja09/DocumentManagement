import { TokenService } from './../../Services/token.service';
import { FileUploaderService } from '../../Services/file-uploader.service';
import { saveAs } from 'file-saver';
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
  recievedDocs;


  constructor(
    private uploadService: FileUploaderService,
    private cd: ChangeDetectorRef,
    private tokenService: TokenService,
  ) { }


  getUserDoc() {
    this.uploadService.getUserDocuments().subscribe(
      data => {
        this.userDocs = data;
      }
    )
  }

  getDocUploadedToUser() {
    this.uploadService.getAllDocsUploadedToUser().subscribe(
      data => {
        this.recievedDocs = data;
      }
    )
  }

  ngOnInit(): void {
    this.uploadService.getUsers().subscribe(
      data => this.users = data
    )

    this.getUserDoc();
    this.getDocUploadedToUser();

  }

  getFileLink(fileID, fileName){
     this.uploadService.getResource(fileID).subscribe(
        data => {
          this.downLoadFile(data, fileName)
        },
        err => console.log(err)
     )
  }

  downLoadFile(data: any, fileName) {
    let blob = new Blob([data], { type: "application/octet-stream" });
    saveAs(blob, fileName);
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
    uploadData.append('uploadedTo', this.uploadedTo);

    this.uploadService.upload(uploadData).subscribe(
      (res) => {
        this.uploadResponse = res
        this.getUserDoc();
      },
      (err) => this.error = err
    );

  }

}
