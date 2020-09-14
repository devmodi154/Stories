import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Story } from 'src/app/models/Story';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {

  storyForm;
  id:number = null;
  @Output() storyCreated = new EventEmitter<Story>();
  @Output() storyUpdated = new EventEmitter<Story>();

  // @Input() story: Story;
  // In the case of a form input we will convert the value to setter method
  @Input() set story(val: Story) {
    this.id = val.id;
    this.storyForm = new FormGroup({
      title: new FormControl(val.title),
      content: new FormControl(val.content)
    });
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  formDisabled() {
    if (this.storyForm.value.title.length && this.storyForm.value.content.length) {
      return false;
    } else {
      return true;
    }
  }

  saveForm() {
      if (this.id) {
        this.apiService.updateStory( this.id,
          this.storyForm.value.title, this.storyForm.value.content).subscribe(
            (result: Story) => this.storyUpdated.emit(result),
            error => console.log(error)
        );
      } else {
        this.apiService.createStory(
          this.storyForm.value.title, this.storyForm.value.content).subscribe(
            (result: Story) => this.storyCreated.emit(result),
            error => console.log(error)
        );
      }
  }

}
