import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'Artist';
  searchCategories:string[] = ['Artist', 'Album', 'Track'];
  resources:ResourceData[];
  randomArtists:string[] = ["Ariana Grande", "Bruno Mars", "Drake", "Bad Bunny", "The Weeknd", "Justin Bieber", "Ed Sheeran", "Eminem", "BTS", "Post Malone"];
  randomAlbums:string[] = ["Un Verano Sin Ti", "÷ (Deluxe)", "Hollywood's Bleeding", "Starboy (Deluxe)", "  After Hours (Deluxe)", "SOUR"];
  randomTracks:string[] = ["Shape of You", "Blinding Lights", "Rockstar", "Dance Monkey", "Someone You Loved", "One Dance"];
  randomPlaceholder:string;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    this.randomPlaceholder = this.selectRandomArtist();
  }

  changeCat() {
    if (this.searchCategory == "Artist") {
      this.randomPlaceholder = this.selectRandomArtist();
    }
    if (this.searchCategory == "Album") {
      this.randomPlaceholder = this.selectRandomAlbum();
    }
    if (this.searchCategory == "Track") {
      this.randomPlaceholder = this.selectRandomTrack();
    }
  }

  selectRandomAlbum() {
    let max = this.randomAlbums.length;
    return this.randomAlbums[Math.floor(Math.random() * max)];
  }

  selectRandomTrack() {
    let max = this.randomTracks.length;
    return this.randomTracks[Math.floor(Math.random() * max)];
  }

  selectRandomArtist() {
    let max = this.randomArtists.length;
    return this.randomArtists[Math.floor(Math.random() * max)];
  }

  getCategory() {
    if (this.searchCategory == "Artist"){
      return "artist"
    } else if (this.searchCategory == "Album"){
      return "album"
    } else {
      return "track"
    }


  }

  search() {
    if (!this.searchString){
      this.searchString = this.randomPlaceholder;
    }
    //TODO: call search function in spotifyService and parse response
    this.spotifyService.searchFor(this.getCategory(), this.searchString).then((response) => {
      this.resources = response;
    });
  }

}
