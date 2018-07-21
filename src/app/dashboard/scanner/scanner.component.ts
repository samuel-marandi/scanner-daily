import { Component, OnInit } from '@angular/core';
import { 
  BrowserQRCodeReader, 
  VideoInputDevice, 
  BrowserBarcodeReader, 
  BrowserDatamatrixCodeReader,
} from '@zxing/library';
import SCAN_TYPE from '../../../constants/enums';
import { 
  processBarCodeResult, 
  processQRCodeResult, 
  processDataMatrixCodeResult
} from '../../utils/code-result-processor';

const sampleBarCodeData = [
  {
    barcode: 8901063092280,
    image: "https://5.imimg.com/data5/DQ/VC/MY-4620137/hide-seek-choco-rolls-biscuits-500x500.jpg",
    name: "Hide and Seek",
    price: 10,
    currency: "USD",
    quantity: 1
  },{
    barcode: 8901063092282,
    image: "https://pics.drugstore.com/prodimg/444028/450.jpg",
    name: "Ramen Noodles",
    price: 10,
    currency: "USD",
    quantity: 1
  }
];

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  selectedScanType: string = SCAN_TYPE.BAR_CODE;

  codeReader = new BrowserBarcodeReader;

  availableCodeReaders = {
    QR_CODE: new BrowserQRCodeReader,
    BAR_CODE: new BrowserBarcodeReader,
    DATA_MATRIX: new BrowserDatamatrixCodeReader,
  }

  capturedBarCodeResult: any = '';

  capturedQRCodeResult: any = '';

  capturedDatatMatrixResult: any = '';

  scannedItems: any[]= [];

  constructor() {}

  ngOnInit() {
    /**
     * TODO: Enable this later
     */
    // this.initCameraAndRead(this.codeReader);
  }

  onScanTypeChange(): void {

    this.codeReader = this.availableCodeReaders[this.selectedScanType];

    this.initCameraAndRead(this.codeReader);

  }

  initCameraAndRead(codeReader): any {
    codeReader.decodeFromInputVideoDevice(undefined, 'video')
          .then(result => this.processCapturedResult(result))
          .catch(err => alert(err));

  }

  onRemoveClick(): void {
    this.capturedDatatMatrixResult = '';
    this.capturedBarCodeResult = '';
    this.capturedQRCodeResult = '';

    this.initCameraAndRead(this.codeReader);
  }

  onAddToItemList(): void {

  }

  processCapturedResult(result) {

    switch(this.selectedScanType) {
      case SCAN_TYPE.QR_CODE:
        this.capturedQRCodeResult = JSON.parse(result);
        this.capturedBarCodeResult = '';
        this.capturedDatatMatrixResult = '';
        break;
      case SCAN_TYPE.BAR_CODE: 
        this.capturedBarCodeResult = sampleBarCodeData.find(data => data.barcode === result);
        this.capturedQRCodeResult = '';
        this.capturedDatatMatrixResult = ''
        break;
      case SCAN_TYPE.DATA_MATRIX: 
        this.capturedDatatMatrixResult = result;
        this.capturedBarCodeResult = '';
        this.capturedQRCodeResult = '';
        break;
      default:
        this.capturedDatatMatrixResult = '';
        this.capturedBarCodeResult = '';
        this.capturedQRCodeResult = '';
        break;
    }

  }



  onButtonClickHandler() : void {
    console.log('I have been clicked')
    const codeReader = new BrowserQRCodeReader();
    
    // codeReader.decodeFromInputVideoDevice(undefined, 'video')
    // .then(result => console.log(result))
    // .catch(err => alert(err));


    codeReader.getVideoInputDevices()
    .then(videoInputDevices => {
        videoInputDevices.forEach(
            device => alert(`${device.label}, ${device.deviceId}`)
            
        );

        const firstDeviceId = videoInputDevices[0].deviceId;

        codeReader.decodeFromInputVideoDevice(undefined, 'video')
          .then(result => console.log(result))
          .catch(err => alert(err));
    })
    .catch(err => alert(err));
  }

  /**
   * Gets the list of available camera devices
   */
}

// getInputDevice(): void {
    
//   const codeReader = new BrowserQRCodeReader();
  
//   const deviceList: Device[] = [{ label: 'Hello', deviceId: '123' }];
  
//   codeReader.getVideoInputDevices()
//   .then(videoInputDevices => 
//     videoInputDevices.forEach(device => this.inputDevices = [...this.inputDevices, device]));
  
// }

// onCameraDeviceChange() : void {
//   console.log('Camera Selected Is:', this.selectedCameraDevice);
// }

// onButtonClickHandler() : void {
//   console.log('I have been clicked')

//   const codeReader = new BrowserQRCodeReader();

//   codeReader.getVideoInputDevices()
//   .then(videoInputDevices => {
//       videoInputDevices.forEach(
//           device => console.log(`${device.label}, ${device.deviceId}`)
//       );

//       const firstDeviceId = videoInputDevices[0].deviceId;


//       codeReader.decodeFromInputVideoDevice(undefined, 'video')
//         .then(result => console.log(result))
//         .catch(err => alert(err));
//       })
//   // .catch(err => alert(err));

  
  
// }
