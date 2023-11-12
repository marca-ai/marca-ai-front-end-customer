import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'customer',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./../views/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'scheduling',
        loadChildren: () => import('./../views/scheduling/scheduling.module').then( m => m.SchedulingPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./../views/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/customer/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
