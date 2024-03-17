import { Component, OnInit } from '@angular/core'; 
import { FileUploadService } from '../../../services/file-upload.service'; 
  
@Component({ 
    selector: 'app-file-upload', 
    templateUrl: './file-upload.component.html', 
    styleUrls: ['./file-upload.component.css'] 
}) 
export class FileUploadComponent implements OnInit { 
  
    // Variable to store shortLink from api response 
    shortLink: string = ""; 
    loading: boolean = false; // Flag variable 
    file: File | undefined; // Variable to store file 
  
    // Inject service  
    constructor(private fileUploadService: FileUploadService) { } 
  
    ngOnInit(): void { 
    } 
  
    // On file Select 
    onChange(event: Event) { 
        this.file = (event.target as HTMLInputElement).files?.[0]; 
    } 
  
    // OnClick of button Upload 
    onUpload() { 
      if (!this.file) {
          // Handle the case where no file is selected
          return;
      }
  
      this.loading = !this.loading; 
      console.log(this.file); 
      this.fileUploadService.upload(this.file).subscribe( 
          (event: any) => { 
              if (typeof (event) === 'object') { 
                  // Short link via api response 
                  this.shortLink = event.link; 
                  this.loading = false; // Flag variable  
              } 
          } 
      ); 
  }
  
} 