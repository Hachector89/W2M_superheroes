import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupersRoutingModule } from './supers-routing.module';
import { HeroComponent } from './pages/hero/hero.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { NewHeroComponent } from './pages/new-hero/new-hero.component';
import { SearchComponent } from './pages/search/search.component';
import { MaterialModule } from './material/material.module';
import { SupeCardComponent } from './components/supe-card/supe-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  declarations: [
    HeroComponent,
    LayoutComponent,
    ListComponent,
    NewHeroComponent,
    SearchComponent,
    SupeCardComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    SupersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SupersModule { }
