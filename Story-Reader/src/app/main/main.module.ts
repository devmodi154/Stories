import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MainComponent } from './main.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryViewComponent } from './story-view/story-view.component';


import { ApiService } from '../api.service';
import { StoryViewModule } from './story-view/story-view.module';

const routes: Routes = [
  {path:'stories',component:MainComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    StoryListComponent,
    StoryDetailsComponent,
    StoryFormComponent,
    StoryViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatFormFieldModule,
    StoryViewModule,
  ],
  exports:[
    RouterModule,
    MatTooltipModule
  ],
  providers:[
    ApiService
  ]
})
export class MainModule { }
