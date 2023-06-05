import {Component, OnInit} from '@angular/core';
import {Season} from "../../models/season";
import {ActivatedRoute} from "@angular/router";
import {SeasonService} from "../../services/season.service";


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  seasonsData: Season[];
  id: string;

  constructor(private route: ActivatedRoute, private seasonService: SeasonService){

    this.id = this.route.snapshot.paramMap.get('id')!;
    this.seasonsData=[] as Season[];
  }

  ngOnInit(): void {
    this.seasonService.getAll().subscribe((response:any)=>{
      console.log(response);
      this.seasonsData = response;
    });
  }

}
