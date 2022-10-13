import { Selector } from "testcafe";
import DevicesPage from '../pages/DevicesPage';
import Logger from 'js-logger';
Logger.useDefaults();

    fixture('test3')
        .page('http://localhost:3001')