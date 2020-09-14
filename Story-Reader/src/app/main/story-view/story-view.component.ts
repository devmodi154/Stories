import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Story } from 'src/app/models/Story';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.css']
})
export class StoryViewComponent implements OnInit {

  constructor(private apiService: ApiService, private cookieService: CookieService,
    private router: Router, private activatedRoute: ActivatedRoute) { }
  
  story: Story;
  storyId: number;
  currentlyViewing: number;

  ngOnInit(): void {
    this.storyId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // Checking for authorization
    const storyRaterToken = this.cookieService.get('story-reader-token'); // Grabbing token cookie
    if( !storyRaterToken ) {
      this.router.navigate(['/auth']);
    } else {
      // Suscribing to the API Service Observable getting all stories
      this.apiService.getStory(this.storyId).subscribe(
        (data: Story) => {
          this.story = data; // A browser does not allow to fetch data from any server(URL) for security [CORS policy error]. Only fetching from same domain is allowed.
        },
        error => console.log(error)
      );
    }
  }

  returnToHomepage() {
    this.updateViews();
    this.router.navigate(['/stories']);
  }

  logout() {
    this.updateViews();
    this.cookieService.delete('story-reader-token');
    console.log(this.cookieService.get('story-reader-token'));
    this.router.navigate(['/auth']);
  }

  updateViews() {
    this.apiService.readStory(true, false, this.story.id).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

}
