import {Config} from '../config/config.ts'
import {enableProdMode} from 'angular2/core';

enableProdMode()

var config = new Config('production');
import {Main} from './main.ts'

new Main(config);
