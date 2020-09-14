import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Story } from '../models/Story';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  
  stories: Story[] = [];
  selectedStory = null; // To catch the stories selected, back to the main component from story-list component.
  editedStory = null; //

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    // Checking for authorization
    const storyRaterToken = this.cookieService.get('story-reader-token'); // Grabbing token cookie
    if( !storyRaterToken ) {
      this.router.navigate(['/auth']);
    } else {
      // Suscribing to the API Service Observable getting all stories
      this.apiService.getStories().subscribe(
        (data: Story[]) => {
          this.stories = data; // A browser does not allow to fetch data from any server(URL) for security [CORS policy error]. Only fetching from same domain is allowed.
        },
        error => console.log(error)
      );
    }

  }

  selectStory(story: Story) {
    this.selectedStory = story;
    this.editedStory = null; // For toggling the view b/w form and details
  }

  editStory(story: Story) {
    this.editedStory = story;
    this.selectedStory = null; // For toggling the view b/w form and details
  }

  createNewStory(){
    this.editedStory = {title:'', content:''};
    this.selectedStory = null;
  }

  deletedStory(story: Story) {
    this.apiService.deleteStory(story.id).subscribe(
      data => {
        this.stories = this.stories.filter(iter_story => iter_story.id !== story.id); // Updating view of story list
      },
      error => console.log(error)
    );
  }

  storyCreated(story: Story) {
    this.stories.push(story);
    this.editedStory = null;
  }

  storyUpdated(story: Story) {
    const index = this.stories.findIndex( mov => mov.id === story.id);
    if (index >= 0 ) {
      this.stories[index] = story;
    }
    this.editedStory = null;
  }

  logout() {
    this.cookieService.delete('story-reader-token');
    this.router.navigate(['/auth']);
  }

}
