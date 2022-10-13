import { Selector } from "testcafe";
import DevicesPage from '../pages/DevicesPage';
import AddDevicePage from '../pages/AddDevicePage';
import Logger from 'js-logger';
Logger.useDefaults();

    fixture('test2')
        .page("http://localhost:3001");

    test('should validate creation of device', async t =>{
        await t
            .click(DevicesPage.findAddDevice())
            .typeText(AddDevicePage.findSystemName(), 'Ninja-PC')

    });