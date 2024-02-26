import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import WebViewer, { WebViewerInstance } from "@pdftron/webviewer";
import { Subject, of } from "rxjs";

import { ApryseService } from './agreement.service';


@Component({
  selector: "app-root",
  styleUrls: ["app.component.css"],
  templateUrl: "app.component.html",
})
export class AppComponent implements AfterViewInit {
  wvInstance?: WebViewerInstance;

  @ViewChild("viewer") viewer!: ElementRef;
  @ViewChild("upload") upload!: ElementRef;


  @Output() coreControlsEvent: EventEmitter<string> = new EventEmitter();

  private documentLoaded$: Subject<void>;

  constructor(
    public apryseService: ApryseService
  ) {
    this.documentLoaded$ = new Subject<void>();
  }

  ngAfterViewInit(): void {
    WebViewer(
      {
        path: "../lib",
        licenseKey:
          "1708437239140:7f5b844a030000000012a8cd1213f051d99456c64dd2f23c9c80561d12", // sign up to get a free trial key at https://dev.apryse.com
      },this.viewer.nativeElement) .then(instance => {
        // Sets the current toolbar group
        instance.UI.disableElements(['toolbarGroup-Shapes']);
        instance.UI.disableElements(['toolbarGroup-Edit']);
        instance.UI.disableElements(['toolbarGroup-Insert']);
        instance.UI.disableElements(['toolbarGroup-Annotate']);
        instance.UI.disableElements(['toolbarGroup-FillAndSign']);
        instance.UI.disableElements(['toolbarGroup-Forms']);

        instance.UI.disableElements(['panToolButton']);
        instance.UI.disableElements(['toggleNotesButton']);
        instance.UI.disableElements(['searchButton']);
        instance.UI.disableElements(['menuButton']);
        instance.UI.disableElements(['viewControlsButton']);
        instance.UI.disableElements(['selectToolButton']);

        
        this.upload.nativeElement.onclick = (e: any) => {
          this.apryseService.downloadDocument().subscribe({
            next: (v: any) => {
              var byteString = atob(v.fileBytes);
              var arrayByffer = new ArrayBuffer(byteString.length);
              var uintArray = new Uint8Array(arrayByffer);
          
              for (var i = 0; i < byteString.length; i++) {
                uintArray[i] = byteString.charCodeAt(i);
              }

              const file = new File([arrayByffer], 'teste', { type: 'application/pdf' });
              instance.UI.loadDocument(file)
              console.log(v.fileBytes)
            }
          })
        }
      })
  }
}
