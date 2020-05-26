import { Component, OnInit } from '@angular/core';

import {
  UserProfile,
  userTableColumns,
  PieChart,
  userGeoCoOrdinatesChartLabel,
  userGeoCoOrdinatesChartColors,
  userGeoCoOrdinatesChartType,
} from '../../common/common';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userProfiles: UserProfile[];
  userPercentage: number;

  showUserCoOrdinatesChart: boolean;
  userGeoCoOrdinates = new PieChart();
  latitudeGreater: number;
  latitudeLesser: number;
  longitudeGreater: number;
  longitudeLesser: number;

  userTableColumns: string[];

  constructor(private userService: UserService) {
    this.userTableColumns = userTableColumns;
    this.userProfiles = [];
    this.userPercentage = 0;
    this.showUserCoOrdinatesChart = false;
    this.latitudeGreater = 0;
    this.latitudeLesser = 0;
    this.longitudeGreater = 0;
    this.longitudeLesser = 0;
  }

  ngOnInit() {
    this.fetchUserProfile();
    this.initialiseChartDefinitions();
  }

  initialiseChartDefinitions() {
    this.userGeoCoOrdinates.chartLabels = userGeoCoOrdinatesChartLabel;
    this.userGeoCoOrdinates.chartType = userGeoCoOrdinatesChartType;
    this.userGeoCoOrdinates.chartOptions = {
      backgroundColor: userGeoCoOrdinatesChartColors,
    };
  }

  fetchUserProfile() {
    this.userService.getUserProfiles().subscribe((userProfiles) => {
      this.userProfiles = userProfiles;
      this.userPercentage = (userProfiles.length / 100) * 100;
      this.calculateUserGeoCount();
    });
  }

  calculateUserGeoCount() {
    this.userProfiles.map((userProfile) => {
      var geoCoOrdinates = userProfile.address.geo;
      if (parseFloat(geoCoOrdinates.lat) > 0) {
        this.latitudeGreater += 1;
      } else {
        this.latitudeLesser += 1;
      }

      if (parseFloat(geoCoOrdinates.lng) > 0) {
        this.longitudeGreater += 1;
      } else {
        this.longitudeLesser += 1;
      }
    });
    this.updateGeoChartCoOrdinatesAndShowChart();
  }

  updateGeoChartCoOrdinatesAndShowChart() {
    this.userGeoCoOrdinates.chartData = [
      this.latitudeGreater,
      this.latitudeLesser,
      this.longitudeGreater,
      this.longitudeLesser,
    ];
    this.showUserCoOrdinatesChart = true;
  }
}
