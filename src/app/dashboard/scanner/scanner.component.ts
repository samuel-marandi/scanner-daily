import { Component, OnInit } from '@angular/core';
import { 
  BrowserQRCodeReader, 
  VideoInputDevice, 
  BrowserBarcodeReader, 
  BrowserDatamatrixCodeReader,
} from '@zxing/library';
import SCAN_TYPE from '../../../constants/enums';
import { processBarCodeResult, isItemAlreadyAdded } from '../../utils/scanner-utils';
import { ToastrService } from 'ngx-toastr'; 
import { Item } from '../interfaces/Item';

const My_DATA: Item[] = [
  {
    currency: "INR",
    id: 89010,
    image: "https://shop.countdown.co.nz/Content/ProductImages/large/9300657790066.jpg/Wattie-s-Mixed-Vegetables-Carrots-Peas-Green-Beans-Corn.jpg",
    name: "Mixed Veggies",
    price: 35,
    quantity: 500,
    unit: "gm"
  }, {
    currency: "INR",
    id: 89211,
    image: "http://www.edenia-foods.com/wp-content/uploads/2016/12/legume-simple_0010_fasole-verde-1kg.png",
    name: "Ramen Noodles",
    price: 23,
    quantity: 1,
    unit: "kg"
  },{
    currency: "INR",
    id: 12345,
    image: "https://boygeniusreport.files.wordpress.com/2018/02/oneplus-5t-red.jpg?quality=98&strip=all&w=782",
    name: "One Plus 6 ",
    price: 30000,
    quantity: 1,
    unit: ""
  }, {
    currency: "INR",
    id: 567890,
    image: "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg",
    name: "iPhone X",
    price: 99000,
    quantity: 1,
    unit: ""
  }, {
    currency: "INR",
    id: 4356789,
    image: "https://5.imimg.com/data5/DQ/VC/MY-4620137/hide-seek-choco-rolls-biscuits-500x500.jpg",
    name: "Hide and Seek",
    price: 15,
    quantity: 1,
    unit: ""
  },{
    currency: "INR",
    id: 9801232,
    image: "https://pics.drugstore.com/prodimg/444028/450.jpg",
    name: "Ramen Noodles",
    price: 10,
    quantity: 1,
    unit: ""
  }
]


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  
  scannedItemColumns: string[] = ['name', 'quantity', 'price', 'id'];
  
  selectedScanType: string = ''; //SCAN_TYPE.BAR_CODE;

  codeReader = new BrowserBarcodeReader;

  availableCodeReaders = {
    QR_CODE: new BrowserQRCodeReader,
    BAR_CODE: new BrowserBarcodeReader,
    DATA_MATRIX: new BrowserDatamatrixCodeReader,
  }

  capturedBarCodeResult: any = '';

  capturedQRCodeResult: any = '';

  capturedDatatMatrixResult: any = '';

  scannedItems: any[] = [];

  showCart: boolean = false;

  totalCostInCart: number = 0;

  constructor(private toastr: ToastrService) {
    this.scannedItems.forEach(item => this.totalCostInCart += item.price);
    
  }

  ngOnInit() {
    // this.initCameraAndRead(this.codeReader);    
  }

  onScanTypeChange(): void {

    this.codeReader = this.availableCodeReaders[this.selectedScanType];

    this.initCameraAndRead(this.codeReader);

  }

  initCameraAndRead(codeReader): any {
    codeReader.decodeFromInputVideoDevice(undefined, 'video')
          .then(result => this.processCapturedResult(result));
          // .catch(err => alert(err));

  }

  onRemoveClick(): void {
    this.capturedDatatMatrixResult = '';
    this.capturedBarCodeResult = '';
    this.capturedQRCodeResult = '';

    this.initCameraAndRead(this.codeReader);
  }

  onItemRemoveClick(id) {
    this.scannedItems = this.scannedItems.filter(item => item.id !== id);
    
    // this.scannedItems.forEach(item => this.totalCostInCart = this.totalCostInCart - item.price);

    // console.log(this.totalCostInCart);

  }

  onAddToItemList(): void {

    const currentScannedItem = this.capturedDatatMatrixResult || this.capturedQRCodeResult || this.capturedBarCodeResult;

    if(isItemAlreadyAdded(this.scannedItems, currentScannedItem)) {
        
      this.toastr.error('', 'This item is already in the list.', { 'timeOut': 3000 });
    
    } else {

      this.scannedItems = [...this.scannedItems, currentScannedItem];

      this.toastr.info('','Item Added', { 'timeOut': 3000 });

      this.capturedDatatMatrixResult = '';
      this.capturedBarCodeResult = '';
      this.capturedQRCodeResult = '';

      this.scannedItems.forEach(item => this.totalCostInCart += item.price);

      this.initCameraAndRead(this.codeReader);
    }

  }

  processCapturedResult(result) {

    switch(this.selectedScanType) {
      case SCAN_TYPE.QR_CODE:
        this.capturedQRCodeResult = JSON.parse(result);
        this.capturedBarCodeResult = '';
        this.capturedDatatMatrixResult = '';
        break;
      case SCAN_TYPE.BAR_CODE: 
        // this.capturedBarCodeResult = sampleBarCodeData.find(data => data.barcode.toString() === result.toString());
        this.capturedBarCodeResult = processBarCodeResult(result);
        this.capturedQRCodeResult = '';
        this.capturedDatatMatrixResult = ''
        break;
      case SCAN_TYPE.DATA_MATRIX: 
        this.capturedDatatMatrixResult = JSON.parse(result);
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




  // onButtonClickHandler() : void {
  //   console.log('I have been clicked')
  //   const codeReader = new BrowserQRCodeReader();
    
    // codeReader.decodeFromInputVideoDevice(undefined, 'video')
    // .then(result => console.log(result))
    // .catch(err => alert(err));


  //   codeReader.getVideoInputDevices()
  //   .then(videoInputDevices => {
  //       videoInputDevices.forEach(
  //           device => alert(`${device.label}, ${device.deviceId}`)
            
  //       );

  //       const firstDeviceId = videoInputDevices[0].deviceId;

  //       codeReader.decodeFromInputVideoDevice(undefined, 'video')
  //         .then(result => console.log(result))
  //         .catch(err => alert(err));
  //   })
  //   .catch(err => alert(err));
  // }

  /**
   * Gets the list of available camera devices
   */