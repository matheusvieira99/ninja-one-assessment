import { Selector } from "testcafe";
import DevicesPage from '../pages/DevicesPage';
import Logger from 'js-logger';
Logger.useDefaults();

    fixture('test3')
        .page('http://localhost:3001')

        test('should validate devices name modification', async t =>{
            //step 1
            const results = await t.request("http://localhost:3000/devices");
            const json = results.body;
            let result = json.map(a => a.id);
            let firstDeviceApi = result[0];
            Logger.info("Id of the first device: " + firstDeviceApi);
            await t.request.put({
                url: "http://localhost:3000/devices/" + firstDeviceApi,
                body: {
                    "system_name": "Renamed Device",
                    "type": "WINDOWS_WORKSTATION",
                    "hdd_capacity": "10"
                }
            });
        
        //step 2
        await t
            .eval(() => location.reload(true));
        
        const firstDevice = await DevicesPage.findDevices().nth(0).find('.device-name').innerText;
        const findRenamedDevice = await DevicesPage.findDeviceName("Renamed Device").innerText;
        
        Logger.info("------------------");
        Logger.info("First device name found on the UI: " + firstDevice);
        await t
        .expect(findRenamedDevice).ok("Renamed Device")
        .expect(firstDevice).eql(findRenamedDevice);
    });