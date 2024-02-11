import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';



 @Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  public dataSource :{
    datasets: [
      {
          data: any[],
          backgroundColor: string[],
      }
  ],
  labels: string[]
}={
  datasets: [
    {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#9b59b6',
          '#1abc9c',
          '#d35400',
        ],
    }
],
labels: []
};



  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
       this.http.get('http://localhost:3000/budget')
       .subscribe((res: any) => {
        console.log(res);
        for (var i = 0; i < res.mybudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.mybudget[i].budget;
          this.dataSource.labels[i] = res.mybudget[i].title;
          }
          this.createChart();

    });
  }

  ngAfterViewInit(): void {

  }

  createChart() {
    var ctx = document.getElementById("myChart")as HTMLCanvasElement;
    var availableChart = Chart.getChart(ctx);
    if (availableChart) {
      availableChart.destroy();
    }
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });

}
}
