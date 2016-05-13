import {Main} from './main.ts'
import {enableProdMode} from 'angular2/core';

var config = require('../config/production.json');

enableProdMode()

new Main(config);
