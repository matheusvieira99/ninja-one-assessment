import { t, Selector } from "testcafe";

class DevicesPage {

    constructor(){}

    findDeviceName(name){
        return Selector('#root > div > div > div.list-devices-main > div').find('.device-name').withExactText(name);
    }

    findDeviceType(type){
        return Selector('#root > div > div > div.list-devices-main > div').find('.device-type').withExactText(type).with({visibilityCheck: true});
    }

    findDeviceCapacity(cap){
        return Selector('#root > div > div > div.list-devices-main > div').find('.device-capacity').withText(cap).with({visibilityCheck: true});
    }

    
    findEditButton(index){
        return Selector('#root > div > div > div.list-devices-main > div').find('.device-edit').nth(index).with({visibilityCheck: true});
    }
    
    findRemoveButton(index){
        return Selector('#root > div > div > div.list-devices-main > div').find('.device-remove').nth(index).with({visibilityCheck: true});
    }
    
    findDevices(){
        return Selector('.device-main-box').with({visibilityCheck: true});
    }

}

export default new DevicesPage();