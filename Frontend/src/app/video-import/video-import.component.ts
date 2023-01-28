import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../services/auth.service';
@Component({
  selector: 'app-video-import',
  templateUrl: './video-import.component.html',
  styleUrls: ['./video-import.component.css']
})
export class VideoImportComponent implements OnInit {
  loading = false;
  importedData: any;

  constructor(public http: HttpClient, public spinner: NgxSpinnerService, public authenticationService: AuthenticationService) { };
  ngOnInit(): void {

  }
  onButtonClick(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.http.post('https://localhost:44321/api/VideoImport/PostFile', formData, { responseType: 'blob', reportProgress: true, observe: 'events' }).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {

          case HttpEventType.UploadProgress:
            console.log(`Upload progress: ${Math.round(event.loaded)}%`);
            break;
          case HttpEventType.Response:
            const file = new Blob([event.body], { type: 'application/octet-stream' });
            const fileURL = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = 'your-file.zip';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}





