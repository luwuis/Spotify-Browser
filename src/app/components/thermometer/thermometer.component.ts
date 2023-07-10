import { Component, OnInit, Input } from '@angular/core';
import { TrackFeature } from 'src/app/data/track-feature';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() name:string;
  @Input() percent:string;
  @Input() percentStr:string;
  @Input() color:string;
  FeatureTypes:string[];
  
  

  constructor() { }

  ngOnInit() {
    this.FeatureTypes = ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence'];
  }

}
