import {NgModel} from '@angular/forms';
import {Router, RouterModule, Routes} from '@angular/router';
import {GerichteComponent} from './gerichte/gerichte.component';
import {AboutComponent} from './about/about.component';
import {NgModule} from '@angular/core';
import {MensenComponent} from './mensen/mensen.component';
import {PraeferenzenComponent} from './praeferenzen/praeferenzen.component';
import {ImpressumComponent} from './impressum/impressum.component';
import {HilfeComponent} from './hilfe/hilfe.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/gerichte', pathMatch: 'full'},
  {path: 'gerichte', component: GerichteComponent},
  {path: 'about', component: AboutComponent},
  {path: 'mensen', component: MensenComponent},
  {path: 'praeferenzen', component: PraeferenzenComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'hilfe', component: HilfeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
