import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';
import { reverseAuthGuard } from './core/reverse-auth-guard';

export const routes: Routes = [
    {
      path: 'auth',
      canActivate: [reverseAuthGuard],
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4201/remoteEntry.js',
          exposedModule: './Routes'
        }).then(m => m.routes)
    },
    
    {
      path: 'todo',
      canActivate: [authGuard],
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4202/remoteEntry.js',
          exposedModule: './Routes'
        }).then(m => m.routes)
    },
    
    {
      path: 'user',
      canActivate: [authGuard],
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4203/remoteEntry.js',
          exposedModule: './Routes'
        }).then(m => m.routes)
    },
    
    {
      path: 'analytics',
      canActivate: [authGuard],
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4204/remoteEntry.js',
          exposedModule: './Routes'
        }).then(m => m.routes)
    },
    
    {
      path: '',
      redirectTo: '/auth',
      pathMatch: 'full'
    }    
];