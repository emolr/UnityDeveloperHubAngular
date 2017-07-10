import {Component} from '@angular/core';
import {remote, ipcRenderer} from 'electron';

@Component({
  selector: 'ut-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ut';
  pluginId = 'unity.plugin.angular';
  serverId: any = ipcRenderer.sendSync('windowManager:getWindowId', 'unity.plugin.utr.server');
  utrList: any;

  constructor() {
    ipcRenderer.on('utr:suggest', (event, arg) => {
      this.utrList = arg;
    });
  }

  sendArgToUtr() {
    remote.BrowserWindow.fromId(this.serverId).webContents.send('utr:suggest', {arg: '10', pluginId: this.pluginId});
  }

}
