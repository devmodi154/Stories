import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faTrash, faEye, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { Story } from 'src/app/models/Story';
import { Router } from '@angular/router';


@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  faBookReader = faBookReader;

  @Input() stories: Story[]= [];
  @Output() selectStory = new EventEmitter<Story>();
  @Output() editedStory = new EventEmitter<Story>();
  @Output() createNewStory = new EventEmitter();
  @Output() deletedStory = new EventEmitter<Story>();
  @Output() updateStory = new EventEmitter<Story>();

  constructor(private apiService: ApiService,  private router: Router) { }

  ngOnInit(): void {

  }

  storyClicked(story: Story) {
    this.selectStory.emit(story); // On event of any story being clicked, the selected story will be emitted back to the main component.
  }

  editStory(story: Story) {
    this.editedStory.emit(story);
  }

  newStory() {
    this.createNewStory.emit();
  }

  deleteStory(story: Story) {
    this.deletedStory.emit(story);
  }

  viewStory(story: Story) {
    this.apiService.readStory(true, true, story.id).subscribe(
      result => {
        this.getDetails(story),
        console.log(result);
      },
      error => console.log(error)
    );
    this.router.navigate(['/stories/'+story.id]);
  }

  getDetails(story:Story) {
    // Return the new number of readers of the Story
    this.apiService.getStory(story.id).subscribe(
      (story: Story) => { // On expecting a type of object the emitter has to be specified with that certain type as well, that is to create the Emitter of Story type.
        this.updateStory.emit(story);
      },
      error => console.log(error)
    );
  }


}
