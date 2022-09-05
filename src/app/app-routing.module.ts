import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { PopupComponent } from "./components/popup/popup.component";

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: 'popup', component: PopupComponent},
  {path: '', redirectTo: 'homepage', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
