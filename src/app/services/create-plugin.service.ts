import { Injectable } from '@angular/core';
import {remote} from 'electron';
const electronFs = remote.require('fs');
const electronPath = remote.require('path');
const electronOS = remote.require('os');

export interface IPluginSettings {
  name: string;
  url: string;
  accelerator?: string;
}

@Injectable()
export class CreatePluginService {

  constructor() { }

  public createPlugin(settings: IPluginSettings, cb) {
    const path = electronPath.resolve(electronOS.homedir(), 'udh', 'plugins', settings.name);
    const pluginTemplate = `
      {
        "pluginId": "unity.plugin.${settings.name}",
        "name": "${settings.name}",
        "version": "0.0.1",
        "author": "R&D",
        "repo": "#",
        "documentation": "#",
        "url": "${settings.url}",
        "accelerator": "${settings.accelerator}",
        "browserWindowSettings": {
          "frame": true,
          "title": "${settings.name}",
          "width": 1200,
          "height": 800
        }
      }
    `;
    // console.log('create', settings);
    if (!electronFs.existsSync(path)) {
      electronFs.mkdir(path, (err) => {
        if (err) {
          alert ('Failed to create plugin folder');
        } else {
          console.log('folder created');
          electronFs.writeFile(`${path}/config.plugin.json`, pluginTemplate, (err) => {
            if (err) {
              alert('Failed to write plugin file');
            } else {
              console.log('plugin created');
              cb();
            }
          });
        }
      });
    } else {
      alert('plugin exists');
    }
  }

  public getInstalledPlugins() {
    let plugins = [];
    const path = electronPath.resolve(electronOS.homedir(), 'udh', 'plugins');
    electronFs.readdirSync(path).forEach(name => {
      if (electronFs.lstatSync(`${path}/${name}`).isDirectory()) {
        const config = JSON.parse(electronFs.readFileSync(`${path}/${name}/config.plugin.json`, 'utf8'));
        plugins.push(config);
      }
    })
    return plugins;
  }

  public removePlugin(name) {
    return new Promise((resolve, reject) => {
      this._deleteFolderRecursive(electronPath.resolve(electronOS.homedir(), 'udh', 'plugins', name), resolve(name));
    })
  }

  _deleteFolderRecursive(path, cb) {
  if( electronFs.existsSync(path) ) {
    electronFs.readdirSync(path).forEach(function(file){
      const curPath = path + '/' + file;
      if(electronFs.lstatSync(curPath).isDirectory()) { // recurse
        this._deleteFolderRecursive(curPath);
      } else { // delete file
        electronFs.unlinkSync(curPath);
      }
    });
    electronFs.rmdirSync(path);
    cb();
  }
};

}
