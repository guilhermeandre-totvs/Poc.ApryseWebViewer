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
      this.viewer.nativeElement)
  }
}
