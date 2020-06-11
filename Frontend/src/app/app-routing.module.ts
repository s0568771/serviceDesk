import {NgModel} from '@angular/forms';
import {Router, RouterModule, Routes} from '@angular/router';
import {GerichteComponent} from './gerichte/gerichte.component';
import {AboutComponent} from './about/about.component';
import {NgModule} from '@angular/core';
import {MensenComponent} from './mensen/mensen.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/gerichte', pathMatch: 'full'},
  {path: 'gerichte', component: GerichteComponent},
  {path: 'about', component: AboutComponent},
  {path: 'mensen', component: MensenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
