import { t, Selector } from "testcafe";

class AddDevicePage {
    constructor(){}

    findSystemName(){
        return Selector('#system_name');
    }

    findType(){
        return Selector("#type");
    }

    findOption(type){
        return Selector("#type").find("option").withText(type);
    }

    findCapacity(){
        return Selector("#hdd_capacity");
    }

    findSaveButton(){
        return Selector(".submitButton");
    }

}

export default new AddDevicePage();