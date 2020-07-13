import { NotificationService } from './../../Services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from 'src/app/Services/file-uploader.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications

  constructor(
    private notificationService: NotificationService,
    private uploadService: FileUploaderService
  ) {
    notificationService.getAllNotifications().subscribe(
      data => {
        this.notifications = data;
        this.notificationService.updateNotifications().subscribe(
          data => this.notificationService.setNotificationCount(0)
        )
      }
    )
   }

  ngOnInit(): void {
  }

  getFileLink(fileID){
    return this.uploadService.getResource(fileID);
  }

}
