import { Component, OnInit } from '@angular/core';
import { BrowserQRCodeReader, VideoInputDevice } from '@zxing/library';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Hello World');
  }

  onButtonClickHandler() : void {
    console.log('I have been clicked')

    const codeReader = new BrowserQRCodeReader();

    codeReader.getVideoInputDevices()
    .then(videoInputDevices => {
        videoInputDevices.forEach(
            device => console.log(`${device.label}, ${device.deviceId}`)
        );

        const firstDeviceId = videoInputDevices[0].deviceId;

        codeReader.decodeFromInputVideoDevice(undefined, 'video')
          .then(result => console.log(result))
          .catch(err => console.error(err));
        })
    .catch(err => console.error(err));

    
    
  }

  

}
