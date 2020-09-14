import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StoryViewComponent } from './story-view.component';

const routes: Routes = [
  {path:'stories/:id',component:StoryViewComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  exports:[RouterModule]
})
export class StoryViewModule { }
