import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzIconModule, NzToolTipModule, NgZorroAntdModule, NZ_I18N, fr_BE} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router'
import { NzTableModule } from 'ng-zorro-antd/table';
import { CVAPComponent } from './cvap/cvap.component';
import { TableHoraireComponent } from './table-horaire/table-horaire.component';
import { HELBComponent } from './helb/helb.component';
import {ApiService} from './Services/api.service';
import { TableGeneralComponent } from './table-general/table-general.component';
import { CavpComponent} from './cavp/cavp.component';

registerLocaleData(fr);

const appRoutes: Routes = [

  { path: 'Profile', component: ProfileComponent },
  { path: 'HELB', component: HELBComponent },
  { path: 'CVAP', component: CavpComponent },
  { path: '', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    CavpComponent,
    TableHoraireComponent,
    HELBComponent,
    TableGeneralComponent,
    CVAPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    NzTableModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ApiService,{ provide: NZ_I18N, useValue: fr_BE }],
  bootstrap: [AppComponent]
})
export class AppModule { }
