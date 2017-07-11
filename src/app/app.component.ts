import {Component} from '@angular/core';
import {CreatePluginService} from './services/create-plugin.service';

@Component({
  selector: 'ut-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  installedPlugins: any;
  pluginFormModel = {
    name: '',
    url: '',
    accelerator: ''
  };

  constructor(public createPluginService: CreatePluginService) {
    this.installedPlugins = this.createPluginService.getInstalledPlugins();
  }

  onSubmit() {
    this.createPluginService.createPlugin(this.pluginFormModel, () => {
      alert('plugin created');
      this.installedPlugins = this.createPluginService.getInstalledPlugins();
    });
  }

  removePlugin(name: string) {
    this.createPluginService.removePlugin(name).then(msg => {
      alert(`${name} is successfully deleted`);
      this.installedPlugins = this.createPluginService.getInstalledPlugins();
    });
  }
}
