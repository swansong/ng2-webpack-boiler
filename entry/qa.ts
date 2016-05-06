import {Config} from '../config/config.ts'
var config = new Config('qa');

import {Main} from './main.ts'

new Main(config);
