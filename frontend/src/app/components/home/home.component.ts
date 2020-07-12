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

  uploadResponse;


  constructor(
    private uploadService: FileUploaderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  // onFileChange(event) {
  //   let reader = new FileReader();

  //   if(event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.fileContent = reader.result

  //       this.cd.markForCheck();
  //     };
  //   }
  // }
  onSelectImage(event) {
    this.fileContent = event.srcElement.files[0];
    console.log(this.fileContent)
  }
  handleFileUpload() {
    let userID = 1
    let payLoad = {
      fileContent: this.fileContent,
      fileName: this.fileName,
      fileDescription: this.fileDescription,
      fileType: this.fileType,
    }

    const uploadData = new FormData();
    uploadData.append('fileContent', this.fileContent, this.fileContent.name);
    uploadData.append('fileName', this.fileContent.name );
    uploadData.append('fileDescription', this.fileDescription);
    uploadData.append('fileType', this.fileType);


    console.log(uploadData)

    this.uploadService.upload(uploadData, userID).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );

  }

}
