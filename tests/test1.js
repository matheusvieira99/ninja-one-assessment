import { Selector } from "testcafe";
import DevicesPage from '../pages/DevicesPage';
import Logger from 'js-logger';
Logger.useDefaults();

    fixture('test1')
        .page("http://localhost:3001");

    test('should validate visibility of devices', async t =>{
        //step 1
        const results = await t.request("http://localhost:3000/devices");
        const json = results.body;
        let getDeviceNameApi = [];
        let getDeviceTypeApi = [];
        let getDeviceCapacityApi = [];


        //looking for device names on backend
        for (let i = 0; i < json.length; i++) {
            getDeviceNameApi.push(json[i].system_name);
          }

        //looking for device types on backend
        for (let i = 0; i <json.length; i++){
            getDeviceTypeApi.push(json[i].type);
        }

        //looking for device capacities on backend
        for (let i = 0; i <json.length; i++){
            getDeviceCapacityApi.push(json[i].hdd_capacity);
        }
        
        //step 2
        //looking for the types on frontend and checking values
        Logger.info("Checking types...");
        for (let i = 0; i < json.length; i++) {
            Logger.info("API info: " + getDeviceTypeApi[i] + " ---- " + "UI info: " + await DevicesPage.findDeviceType(getDeviceTypeApi[i]).innerText);
            await t
            .expect(DevicesPage.findDeviceType(getDeviceTypeApi[i]).innerText).eql(getDeviceTypeApi[i]);
        }
        Logger.info("------------------");

        //looking for the capacities on frontend and checking values
        Logger.info("Checking capacities...");
        for (let i = 0; i < json.length; i++) {
            Logger.info("API info: " + getDeviceCapacityApi[i] + " ---- " + "UI info: " + await DevicesPage.findDeviceCapacity(getDeviceCapacityApi[i]).innerText);
            await t
                .expect(DevicesPage.findDeviceCapacity(getDeviceCapacityApi[i]).innerText).eql(`${getDeviceCapacityApi[i]} GB`);
        }
        Logger.info("------------------");

        //looking for the names on frontend and checking values
        Logger.info("Checking names...");
        for (let i = 0; i < json.length; i++) {
            Logger.info("API info: " + getDeviceNameApi[i] + " ---- " + "UI info: " + await DevicesPage.findDeviceName(getDeviceNameApi[i]).innerText);
            await t
                .expect(DevicesPage.findDeviceName(getDeviceNameApi[i]).innerText).eql(getDeviceNameApi[i]);
        }

    });

    //step 3
    test('should validate edit and delete buttons in all devices', async t => {
        await t.wait(3000);
        //counting the number of devices
        const amountOfDevices = await DevicesPage.findDevices().count;
        //asserting that the list of devices on frontend is populated
        await t.expect(amountOfDevices).gt(0);
        Logger.info("------------------");
        Logger.info("Amount of devices found on the UI: " + amountOfDevices);

        //verifying existence of edit buttons
        Logger.info("------------------");
        Logger.info("Verifying existence of edit button of each device...");
        for(let i = 0; i < amountOfDevices; i++){
            const editButtonExists = await DevicesPage.findEditButton(i).exists;
            Logger.info("Device number " + i + " edit button is present: " + editButtonExists);
            await t.expect(editButtonExists).ok();
        }

        //verifying existence of remove buttons
        Logger.info("------------------");
        Logger.info("Verifying existence of remove button of each device...");
        for(let i = 0; i < amountOfDevices; i++){
            const removeButtonExists = await DevicesPage.findRemoveButton(i).exists;
            Logger.info("Device number " + i + " remove button is present: " + removeButtonExists);
            await t.expect(removeButtonExists).ok();
        }

    });