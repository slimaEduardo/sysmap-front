import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CompanyComponent } from './pages/company/company.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginatorModule } from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DestinyComponent } from './pages/destiny/destiny.component';
import {DropdownModule} from 'primeng/dropdown';
import { TravelMapComponent } from './pages/travel-map/travel-map.component';
import {ListboxModule} from 'primeng/listbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    DropdownModule,
    AppRoutingModule,
    ListboxModule,
    AutoCompleteModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CompanyComponent,
    PaginationComponent,
    DestinyComponent,
    TravelMapComponent,

  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
