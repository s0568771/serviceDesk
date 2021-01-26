import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {GerichteComponent} from './gerichte/gerichte.component';
import {GerichteItemComponent} from './gerichte/gerichte-item/gerichte-item.component';
import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app-routing.module';
import {MainNavComponent} from './main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {MensenComponent } from './mensen/mensen.component';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PraeferenzenComponent } from './praeferenzen/praeferenzen.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { HilfeComponent } from './hilfe/hilfe.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {GerichtService} from './service/gericht.service';
import {MensaService} from './service/mensa.service';
import { DirectionComponent } from './direction/direction.component';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    GerichteComponent,
    GerichteItemComponent,
    AboutComponent,
    MainNavComponent,
    MensenComponent,
    PraeferenzenComponent,
    ImpressumComponent,
    HilfeComponent,
    DirectionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    AppRoutingModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatChipsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatSlideToggleModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAtAAHUztBoOPGGXqxCY1j7opoargbNpf8'}),
    AgmCoreModule,
    AgmDirectionModule,
    MatRippleModule,
    MatDatepickerModule

  ],
  providers: [GerichtService, MensaService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
