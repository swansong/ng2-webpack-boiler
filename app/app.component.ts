import {Component} from '@angular/core';
import {Inject} from '@angular/core';


let style = require('!raw!less!./app.less');

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [style]
})

export class AppComponent {
  constructor(@Inject("Config") config) {}
}
