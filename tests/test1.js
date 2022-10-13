import { Selector } from "testcafe";
import DevicesPage from '../pages/DevicesPage';

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
        for (let i = 0; i < json.length; i++) {
            //console.log(await DevicesPage.findDeviceType(getDeviceTypeApi[i]).innerText);
            await t
                .expect(DevicesPage.findDeviceType(getDeviceTypeApi[i]).innerText).eql(getDeviceTypeApi[i]);
        }

        //looking for the capacities on frontend and checking values
        for (let i = 0; i < json.length; i++) {
            //console.log(await DevicesPage.findDeviceCapacity(getDeviceCapacityApi[i]).innerText);
            await t
                .expect(DevicesPage.findDeviceCapacity(getDeviceCapacityApi[i]).innerText).eql(`${getDeviceCapacityApi[i]} GB`);
        }

        //looking for the names on frontend and checking values
        for (let i = 0; i < json.length; i++) {
            //console.log(await DevicesPage.findDeviceName(firstDeviceApi[i]).innerText);
            await t
                .expect(DevicesPage.findDeviceName(getDeviceNameApi[i]).innerText).eql(getDeviceNameApi[i]);
        }

    });

    //step 3
    test('should validate edit and delete buttons in all devices', async t => {
        //counting the number of devices
        const amountOfDevices = await DevicesPage.findDevices().count;
        //asserting that the list of devices on frontend is populated
        await t.expect(amountOfDevices).gt(0);
        console.log(amountOfDevices);
        //verifying existence of edit buttons
        for(let i = 0; i < amountOfDevices; i++){
            const editButtonExists = await DevicesPage.findEditButton(i).exists;
            await t.expect(editButtonExists).ok();
        }

        //verifying existence of remove buttons
        for(let i = 0; i < amountOfDevices; i++){
            const removeButtonExists = await DevicesPage.findRemoveButton(i).exists;
            await t.expect(removeButtonExists).ok();
        }

    });