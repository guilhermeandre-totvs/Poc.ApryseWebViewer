import {AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import WebViewer from "@pdftron/webviewer";
import { ApryseService } from './agreement.service';

@Component({
  selector: "app-root",
  styleUrls: ["app.component.css"],
  templateUrl: "app.component.html",
})
export class AppComponent implements AfterViewInit {

  @ViewChild("viewer") viewer!: ElementRef;
  @ViewChild("upload") upload!: ElementRef;

  valid: boolean = true

  constructor(
    public apryseService: ApryseService,
    private changeDetectorRef: ChangeDetectorRef
  ) {  }

  ngAfterViewInit(): void {
    WebViewer(
      {
        path: "../lib",
        licenseKey:"1708437239140:7f5b844a030000000012a8cd1213f051d99456c64dd2f23c9c80561d12", // sign up to get a free trial key at https://dev.apryse.com
      },this.viewer.nativeElement).then(instance => {
        const { documentViewer } = instance.Core;
        const { GoTo } = instance.Core.Actions;


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
            }
          })
        }

        documentViewer.addEventListener('documentLoaded', () => {
          const actualPage = documentViewer.getPageCount()
          this.valid = actualPage === 1 ? false : true
          this.changeDetectorRef.detectChanges();
          
        })

        documentViewer.addEventListener('pageNumberUpdated', pageNumber => {
          const actualPage = documentViewer.getPageCount();
          this.valid = actualPage === pageNumber ? false : true
          this.changeDetectorRef.detectChanges();     
        });

      
        // const nextPageButton = {
        //   type: 'statefulButton',
        //   initialState: 'Page',
        //   states: {
        //     Page: {
        //       // Checkout https://www.pdftron.com/api/web/WebViewerInstance.html to see more APIs related with viewerInstance
        //       onClick: () => {
        //         new GoTo(1)
        //       }
        //     }
        //   },
        //   mount: (update: (...params: any[]) => any) => {
        //     // Checkout https://www.pdftron.com/api/web/Core.DocumentViewer.html to see more APIs and events with docViewer
        //     // We want to update this button when page number changes so it can have the correct content;
        //     instance.Core.documentViewer.addEventListener('pageNumberUpdated.nextPageButton', update);
        //   },
  
        //   dataElement: 'nextPageButton'
        // };

        
        instance.UI.setHeaderItems(function(header) {
          header.update([
            {
              type: 'statefulButton',
              initialState: 'Page',
              states: {
                Page: {
                  // Checkout https://www.pdftron.com/api/web/WebViewerInstance.html to see more APIs related with viewerInstance
                  onClick: () => {
                    const currentPage = documentViewer.getCurrentPage();
                    const totalPages = documentViewer.getPageCount();
                    const atLastPage = currentPage === totalPages;
            
                    documentViewer.setCurrentPage(3, true )
                  }
                }
              },
            }
          ])
        })
      })
  }
}
