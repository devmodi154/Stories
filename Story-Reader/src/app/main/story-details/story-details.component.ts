import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../api.service';
import { Story } from '../../models/Story';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {

  faStar = faStar;
  @Input() story: Story;
  @Output() updateStory = new EventEmitter<Story>();
  rateHovered = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  // rateHover(rate: number) {
  //   this.rateHovered = rate;
  // }

  getDetails() {
    // Return the new added rating of the Story
    this.apiService.getStory(this.story.id).subscribe(
      (story: Story) => { // On expecting a type of object the emitter has to be specified with that certain type as well, that is to create the Emitter of Story type.
        this.updateStory.emit(story);
      },
      error => console.log(error)
    );
  }

}
