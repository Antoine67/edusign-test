import {
  Component,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import SignaturePad from "signature_pad";

@Component({
  selector: 'signature-dialog',
  templateUrl: './signature-dialog.component.html',
  styleUrls: ['./signature-dialog.component.css']
})
export class SignatureDialogComponent implements AfterViewInit {

  signPad?: SignaturePad;
  @ViewChild('signPadCanvas', {static: false}) signaturePadElement:any;
  signImage:any;

  constructor(private dialogRef: MatDialogRef<SignatureDialogComponent>,) { }

  ngAfterViewInit() {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
  }
  
    
  clearSignPad() {
    this.signPad?.clear();
  }
  
  saveSignPad() {
    const base64ImageData = this.signPad?.toDataURL();
    this.signImage = base64ImageData;

    this.dialogRef.close(base64ImageData);
  }


}
