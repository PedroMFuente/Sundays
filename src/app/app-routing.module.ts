import {
    NgModule
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
const routes: Routes = [{
        path: '',
        redirectTo: 'screen1',
        pathMatch: 'full'
    },
    {
        path: 'screen1',
        loadChildren: './Screen1/Screen1.module#Screen1PageModule',
    },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
];
@NgModule({
    imports: [RouterModule.forRoot(
        routes, {
            enableTracing: false,
            useHash: true
        }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule {}