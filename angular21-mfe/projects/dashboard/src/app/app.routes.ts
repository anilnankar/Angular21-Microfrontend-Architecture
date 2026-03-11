import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      {
        path: 'todo',
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4202/remoteEntry.js',
            exposedModule: './Routes'
          }).then(m => m.routes)
      },
      {
        path: 'analytics',
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4204/remoteEntry.js',
            exposedModule: './Routes'
          }).then(m => m.routes)
      }
    ]
  }
];
