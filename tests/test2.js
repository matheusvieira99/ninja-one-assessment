import { Selector } from "testcafe";
import DevicesPage from '../pages/DevicesPage';
import AddDevicePage from '../pages/AddDevicePage';
import Logger from 'js-logger';
Logger.useDefaults();

    fixture('test2')
        .page("http://localhost:3001");

        
        test('should validate creation of device', async t =>{
        let amountOfDevices = await DevicesPage.findDevices().count;
        const systemName = 'Ninja-PC';
        const type = 'MAC';
        const capacity = '25';
        //step 1
        Logger.info("------------------");
        Logger.info("Creating new device...");
        await t
            .click(DevicesPage.findAddDevice())
            .typeText(AddDevicePage.findSystemName(), systemName)
            .click(AddDevicePage.findType())
            .click(AddDevicePage.findOption(type))
            .typeText(AddDevicePage.findCapacity(), capacity)
            .click(AddDevicePage.findSaveButton());

        const isDeviceNameVisible = await DevicesPage.findDeviceName(systemName).visible;
        const isDevicetypeVisible = await DevicesPage.findDeviceType(type).visible;
        const isDeviceCapacityVisible = await DevicesPage.findDeviceCapacity(capacity).visible;

        Logger.info("Amount of Devices on the UI: " + amountOfDevices);
        Logger.info("------------------");
        Logger.info("Device: " + systemName + " is properly created: " + isDeviceNameVisible);
        //step 2
        await t
            .eval(() => location.reload(true));

        await t
            .expect(isDeviceNameVisible).ok()
            .expect(isDevicetypeVisible).ok()
            .expect(isDeviceCapacityVisible).ok();

    });