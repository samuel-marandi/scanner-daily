
import barCodeData from '../../assets/barcode-data.json';
import qrCodeData from '../../assets/qrcode-data.json';

const processBarCodeResult = (result) => barCodeData.filter(data => data.barCode.toString() === result.toString())[0];

const processQRCodeResult = (result) => qrCodeData.find(data => alert(data));

const processDataMatrixCodeResult = (result) => {};

export { processBarCodeResult, processQRCodeResult, processDataMatrixCodeResult};