import { t, Selector } from "testcafe";

class AddDevicePage {
    constructor(){}

    findSystemName(){
        return Selector('#system_name');
    }

}

export default new AddDevicePage();