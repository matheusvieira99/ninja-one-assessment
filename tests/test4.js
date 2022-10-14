import { Selector } from "testcafe";
import DevicesPage from '../pages/DevicesPage';
import Logger from 'js-logger';
Logger.useDefaults();

    fixture('test4')
        .page("http://localhost:3001");

        test('should validate creation of device', async t =>{
            const results = await t.request("http://localhost:3000/devices");
            const json = results.body;
            let result = json.map(a => a.id);
            let keyCount  = Object.keys(result).length;
            //Logger.info(keyCount);
            let indexPositionOfLastDevice = keyCount - 1;
            let lastDeviceId = result[indexPositionOfLastDevice];
            Logger.info("Id of the last device on the list:" + lastDeviceId);

            const getLastDevice = await t.request("http://localhost:3000/devices/" + lastDeviceId);
            const lastDeviceJson = getLastDevice.body;
            let lastDeviceName = lastDeviceJson.system_name;
            Logger.info("Last device on the list: " + lastDeviceName);

            //step 1
            Logger.info("Removing device...");
            await t.request.delete({
                url: "http://localhost:3000/devices/" + lastDeviceId
            });

            await t
                .eval(() => location.reload(true));

            await t
                //verifying through the name
                //step 2
                .expect(DevicesPage.findDeviceName(lastDeviceName).exists).notOk();
        });