
import barCodeData from '../../assets/barcode-data.json';
import qrCodeData from '../../assets/qrcode-data.json';

const processBarCodeResult = (result) => barCodeData.find(data => data.id.toString() === result.toString());

const isItemAlreadyAdded = (items, scannedItem) => {
    const searchedItem = items.filter(item => item.id.toString() === scannedItem.id.toString());
    
    return searchedItem.length === 0 ? false : true;
}

export { processBarCodeResult, isItemAlreadyAdded };