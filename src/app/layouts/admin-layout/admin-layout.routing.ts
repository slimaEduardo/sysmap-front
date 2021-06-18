import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CompanyComponent } from 'app/pages/company/company.component';
import { DestinyComponent } from 'app/pages/destiny/destiny.component';
import { TravelMapComponent } from 'app/pages/travel-map/travel-map.component';
import { MapsPeriodComponent } from 'app/pages/maps-period/maps-period.component';
import { UserComponent } from 'app/pages/user/user.component';
import { CategoriasComponent } from 'app/pages/categorias/categorias.component';



export const AdminLayoutRoutes: Routes = [
    
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'company',        component: CompanyComponent },
    { path: 'destiny',        component: DestinyComponent },
    { path: 'travelMap',      component: TravelMapComponent },
    { path: 'mapsPeriod',    component: MapsPeriodComponent},
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'user',        component: UserComponent },
    { path: 'categorias',      component: CategoriasComponent}
];
