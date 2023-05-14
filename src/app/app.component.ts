import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetComponent} from "./@shared/components/widget/widget.component";
import {statisticData} from "./constant-data/statistic.data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  optionsByType = (type: string) => {
    switch (type) {
      case 'fb':
        return {
          component: () => import('./@shared/components/widget/widget.component').then(m => m.WidgetComponent),
          inputs: statisticData.find(item => item['id'] === type)!
        }
      case 'tw':
        return {
          component: () => import('./@shared/components/widget/widget.component').then(m => m.WidgetComponent),
          inputs: statisticData.find(item => item['id'] === type)!
        }
      case 'ig':
        return {
          component: () => import('./@shared/components/widget/widget.component').then(m => m.WidgetComponent),
          inputs: statisticData.find(item => item['id'] === type)!
        }
      default:
        return {
          component: () => import('./@shared/components/widget/widget.component').then(m => m.WidgetComponent),
          inputs: statisticData.find(item => item['id'] === type)!
        }
    }
  }

  @ViewChild('container', {
    static: true,
    read: ViewContainerRef
  }) container!: ViewContainerRef;
  buttons: any[] = [
    {
      label: 'Create Widget Facebook',
      action: () => this.createDynamicWidget('fb')
    },
    {
      label: 'Create Widget Twitter',
      action: () => this.createDynamicWidget('tw')
    },
    {
      label: 'Create Widget Instagram',
      action: () => this.createDynamicWidget('ig')
    }
  ]

  async createDynamicWidget(type: string) {

    this.container.clear();
    const {component, inputs} = this.optionsByType(type);

    const componentInstance = await component();
    const componentRef: ComponentRef<WidgetComponent> = this.container.createComponent(componentInstance);
    componentRef.instance.configOptions = inputs;
  }
}
