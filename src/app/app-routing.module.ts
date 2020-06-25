import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateListComponent } from './plates/plate-list/plate-list.component';
import { PlateCreateComponent } from './plates/plate-create/plate-create.component';

const routes: Routes = [
  { path: '', component: PlateListComponent },
  { path: 'create', component: PlateCreateComponent },
  { path: 'edit/:plateId', component: PlateCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
