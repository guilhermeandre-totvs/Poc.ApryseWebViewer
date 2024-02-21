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
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  styleUrls: ["app.component.css"],
  templateUrl: "app.component.html",
})
export class AppComponent implements AfterViewInit {
  wvInstance?: WebViewerInstance;

  @ViewChild("viewer") viewer!: ElementRef;

  @Output() coreControlsEvent: EventEmitter<string> = new EventEmitter();

  private documentLoaded$: Subject<void>;

  constructor() {
    this.documentLoaded$ = new Subject<void>();
  }

  ngAfterViewInit(): void {
    WebViewer(
      {
        path: "../lib",
        licenseKey:
          "demo:1708437239140:7f5b844a030000000012a8cd1213f051d99456c64dd2f23c9c80561d12", // sign up to get a free trial key at https://dev.apryse.com
      },
      this.viewer.nativeElement) .then(instance => {
        // Sets the current toolbar group
        instance.UI.disableElements(['toolbarGroup-Shapes']);
        instance.UI.disableElements(['toolbarGroup-Edit']);
        instance.UI.disableElements(['toolbarGroup-Insert']);
        instance.UI.disableElements(['toolbarGroup-Annotate']);
        instance.UI.disableElements(['toolbarGroup-FillAndSign']);
        instance.UI.disableElements(['toolbarGroup-Forms']);
        instance.UI.disableElements(['toolbarGroup-View']);

        instance.UI.disableElements(['panToolButton']);
        instance.UI.disableElements(['toggleNotesButton']);
        instance.UI.disableElements(['searchButton']);
        instance.UI.disableElements(['menuButton']);
        instance.UI.disableElements(['viewControlsButton']);
        instance.UI.disableElements(['selectToolButton']);
        

      })
  }
}
