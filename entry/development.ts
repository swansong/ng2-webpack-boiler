import {Config} from '../config/config.ts'
var config = new Config('development');

import {Main} from './main.ts'

new Main(config);
