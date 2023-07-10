import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'https://spotify-browser-webserver-1ce52ad5b88e.herokuapp.com';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    // use the injected http Service to make a get request to the Express endpoint and return the response.
    // the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    // update the return to instead return a Promise with the data from the Express server
    // Note: toPromise() is a deprecated function that will be removed in the future.
    // https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated    
    var rprom = this.http.get(this.expressBaseUrl + endpoint).toPromise().then((data) => {
      var prom = (data);
      return prom;
    });
    return Promise.resolve(rprom);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    // Identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    // Make sure to encode the resource with encodeURIComponent().
    // Depending on the category (artist, track, album), return an array of that type of data.
    
    var resourceEnco = encodeURIComponent(resource);
    return this.sendRequestToExpress('/search/'+category+"/"+resourceEnco).then((data) => {
      var result = [];
      if(category == "artist"){
        for (var i in data.artists.items){
          result.push(new ArtistData(data.artists.items[i]));
        }
      } else if(category == "album"){
        for (var i in data.albums.items){
          result.push(new AlbumData(data.albums.items[i]));
        }
      } else if(category == "track"){
        for (var i in data.tracks.items){
          result.push(new TrackData(data.tracks.items[i]));
        }
      }
      return result;
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    // use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    let resourceEnco = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist/'+resourceEnco).then((data) => {
      console.log(data);
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    // use the related artist endpoint to make a request to express and return an array of artist data.
    let resourceEnco = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist-related-artists/'+resourceEnco).then((data) => {
      var result = [];
      for (var i in data.artists){
          result.push(new ArtistData(data.artists[i]));
        }
      console.log(result);
      return result;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    // use the top tracks endpoint to make a request to express.
    let resourceEnco = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist-top-tracks/'+resourceEnco).then((data) => {
      var result = [];
      for (var i in data.tracks){
          result.push(new TrackData(data.tracks[i]));
        }
      console.log(result);
      return result;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    // use the albums for an artist endpoint to make a request to express.
    let resourceEnco = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist-albums/'+resourceEnco).then((data) => {
      var result = [];
      for (var i in data.items){
          result.push(new AlbumData(data.items[i]));
        }
      console.log(result);
      return result;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    // use the album endpoint to make a request to express.
    let resourceEnco = encodeURIComponent(albumId);
    return this.sendRequestToExpress('/album/'+resourceEnco).then((data) => {
      console.log(data);
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    // use the tracks for album endpoint to make a request to express.
    let resourceEnco = encodeURIComponent(albumId);
    return this.sendRequestToExpress('/album-tracks/'+resourceEnco).then((data) => {
      var result = [];
      for (var i in data.items){
          result.push(new TrackData(data.items[i]));
        }
      console.log(result);
      return result;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    // use the track endpoint to make a request to express.
    let resourceEnco = encodeURIComponent(trackId);
    return this.sendRequestToExpress('/track/'+resourceEnco).then((data) => {
      console.log(data);
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    // use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/' + encodeURIComponent(trackId)).then((data) =>{
      return Object.keys(data).map((key)=>{
        return new TrackFeature(key, data[key]);
      });
    });
  }
}
