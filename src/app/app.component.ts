import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import WebViewer from '@pdftron/webviewer';
import { ApryseService } from './agreement.service';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('viewer') viewer!: ElementRef;
  @ViewChild('upload') upload!: ElementRef;
  @ViewChild('teste') teste!: ElementRef;
  @ViewChild('thumb') thumb!: ElementRef;

  @ViewChild('previousPage') previousPage!: ElementRef;
  @ViewChild('nextPage') nextPage!: ElementRef;

  valid: boolean = true;
  page: number = 1;
  numberPage: number = 1;

  constructor(
    public apryseService: ApryseService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    WebViewer(
      {
        path: '../lib',
        licenseKey:
          '1708437239140:7f5b844a030000000012a8cd1213f051d99456c64dd2f23c9c80561d12',
      },
      this.viewer.nativeElement
    ).then((instance) => {
      const { documentViewer } = instance.Core;

      instance.UI.disableElements(['header']); //
      instance.UI.disableElements([
        'outlinesPanelButton',
        'thumbnailsControlRotateCounterClockwise',
        'thumbnailsControlRotateClockwise',
        'thumbCloseMultiSelect',
        'thumbnailsControlManipulatePopupSmallTrigger',
        'thumbMultiSelect',
        'pageNavOverlay',
      ]);

      this.upload.nativeElement.onclick = (e: any) => {
        this.apryseService.downloadDocument().subscribe({
          next: (v: any) => {
            var byteString = atob(v.fileBytes);
            var arrayByffer = new ArrayBuffer(byteString.length);
            var uintArray = new Uint8Array(arrayByffer);

            for (var i = 0; i < byteString.length; i++) {
              uintArray[i] = byteString.charCodeAt(i);
            }

            const file = new File([arrayByffer], 'teste', {
              type: 'application/pdf',
            });
            instance.UI.loadDocument(file);
          },
        });
      };

      this.thumb.nativeElement.onclick = (e: any) => {
        // instance.UI.closeElements(['leftPanel']);
        instance.UI.openElements(['leftPanel']);
      };

      documentViewer.addEventListener('documentLoaded', () => {
        const actualPage = documentViewer.getPageCount();
        this.valid = actualPage === 1 ? false : true;
        this.changeDetectorRef.detectChanges();
      });

      documentViewer.addEventListener('pageNumberUpdated', (pageNumber) => {
        const actualPage = documentViewer.getPageCount();
        this.numberPage = pageNumber;
        this.valid = actualPage === pageNumber ? false : true;
        this.changeDetectorRef.detectChanges();
      });

      this.previousPage.nativeElement.onclick = () => {
        documentViewer.setCurrentPage(this.numberPage - 1, true);
      };

      this.nextPage.nativeElement.onclick = () => {
        documentViewer.setCurrentPage(this.numberPage + 1, true);
      };
    });
  }
}
