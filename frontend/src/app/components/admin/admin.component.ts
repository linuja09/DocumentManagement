import { FileUploaderService } from 'src/app/Services/file-uploader.service';
import { AdminService } from './../../Services/admin.service';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allUsers
  allDocs

  constructor(
    private admin: AdminService,
    private uploadService: FileUploaderService,

  ) { }

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

  ngOnInit(): void {
    this.admin.getAllDocs().subscribe(
      data => this.allDocs = data
    )
    this.admin.getAllUsers().subscribe(
      data => this.allUsers = data
    )
  }

}
