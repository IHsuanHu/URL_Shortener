
import { Component } from '@angular/core';
import { NgTinyUrlService } from 'ng-tiny-url';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UrlShortener';
  model = {
    inputUrl:''
  }
  isFormSubmitted = false;
  isLoading = false;
  shortUrl = '';
  isTextCopied = false;
  constructor(private tinyUrl:NgTinyUrlService) {}

  onSubmitUrlForm(urlForm:any) {
    if(urlForm.valid) {
      this.isLoading = true;
      this.tinyUrl.shorten(this.model.inputUrl).subscribe((data) =>{
        this.shortUrl = data;
        this.isFormSubmitted = true;
        this.isLoading = false;
      } ,(error) =>{
        alert("Wrong URL input");
        this.isLoading = false;
      })
    }
  }
  reset() {
    this.model.inputUrl = '';
    this.isFormSubmitted = false;
    this.isTextCopied = false;
  }
  
  copy(shortUrlElementRef:any) {
    let InputElement = document.createElement('input')
    InputElement.setAttribute('type', 'text')
    InputElement.setAttribute('value', shortUrlElementRef.innerHTML)
    InputElement.select();
    InputElement.setSelectionRange(0, 999999);
    try{
      navigator.clipboard.writeText(InputElement.value);
      this.isTextCopied = true;
      setTimeout(() => {
        this.isTextCopied = false;
      },2000);
    } catch(e:any) {
      console.warn('Error while coping..', e.toString())
    }
  }

  // shortenedUrl = '';
  // url = '';

  // constructor(public tinyUrl: NgTinyUrlService) {
  //   // this.tinyUrl.shorten(this.url).subscribe(res => {
  //   //   this.shortenedUrl = res;
  //   // })
  // }
  
  // generateUrl(value:string){
  //   this.url = value;
  //   this.tinyUrl.shorten(this.url).subscribe(res => {
  //     this.shortenedUrl = res;
  //   })
    
  // }
  // resetUrl() {
  //   this.shortenedUrl = '';
  // }
}
