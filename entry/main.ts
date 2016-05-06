import {bootstrap} from '@angular/platform/browser'
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from '../app/app.component.ts'

export class Main {
  constructor(config) {
    bootstrap(AppComponent, [HTTP_PROVIDERS, provide('Config', {useValue: config})]);
  }
}
