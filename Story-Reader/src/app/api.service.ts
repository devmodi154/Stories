import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Story } from './models/Story';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiUrl;
  baseStoryUrl = `${this.baseUrl}API/stories/`;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor( private httpClient:HttpClient, private cookieService: CookieService) { }

  getStories() {
    // API Get Call:
    return this.httpClient.get<Story[]>(this.baseStoryUrl, {headers:this.getAuthHeaders()}); // HttpClient returns an Observable
  }

  getStory(id: number) {
    // API Get Call for retrieving new result on updatation/creation of new ratings
    return this.httpClient.get<Story>(`${this.baseStoryUrl}${id}/`, {headers:this.getAuthHeaders()});
  }

  createStory(title: string, content: string) {
    // API Post Call to create a new Story
    const body = JSON.stringify({title, content});
    return this.httpClient.post(`${this.baseStoryUrl}`, body, {headers:this.getAuthHeaders()});
  }

  updateStory(id:number, title: string, content: string) {
    // API Post Call to update Story
    const body = JSON.stringify({title, content});
    return this.httpClient.put(`${this.baseStoryUrl}${id}/`, body, {headers:this.getAuthHeaders()});
  }

  deleteStory(id:number) {
    // API Delete Call to delete a  Story
    return this.httpClient.delete(`${this.baseStoryUrl}${id}/`, {headers:this.getAuthHeaders()});
  }

  readStory(readingStatus: boolean, currentStatus: boolean, StoryId: number) {
    // API Post Call:
    const body = JSON.stringify({isRead: readingStatus, isCurrentlyReading: currentStatus});
    return this.httpClient.post(`${this.baseStoryUrl}${StoryId}/read_story/`, body, {headers:this.getAuthHeaders()});
  }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers:this.headers});
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}API/users/`, body, {headers:this.headers});
  }

  getAuthHeaders() {
    const token = this.cookieService.get("story-reader-token");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }

}
