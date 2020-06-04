import {NgModel} from '@angular/forms';
import {Router, RouterModule, Routes} from '@angular/router';
import {GerichteComponent} from './gerichte/gerichte.component';
import {AboutComponent} from './about/about.component';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {path: '', redirectTo: '/gerichte', pathMatch: 'full'},
  {path: 'gerichte', component: GerichteComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
