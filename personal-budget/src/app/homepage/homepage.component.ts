import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';



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



  constructor(private http: HttpClient, private dataService: DataService ) { }

  ngOnInit(): void {
       this.http.get('http://localhost:3000/budget')
       .subscribe((res: any) => {
        console.log(res);
        for (var i = 0; i < res.mybudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.mybudget[i].budget;
          this.dataSource.labels[i] = res.mybudget[i].title;
          }
          this.createChart();

      if (this.dataService.isBudgetDataEmpty()) {
        this.dataService.getBudgetData().subscribe((data: any) => {
          this.created3JSchart(data.mybudget);
          this.dataService.setBudgetData(data.mybudget);
        });
      } else {
        const availableData = this.dataService.getStoredBudgetData();
        this.created3JSchart(availableData);
      }

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
created3JSchart(data: any[]){
  const budgetValues = data.map((d: any) => d.budget);
  const width = 700;
  const height = 500;
  const radius = Math.min(width,height) / 2;

  const svg = d3.select('#d3JSChart')
  .append('svg')
  .attr('width',width)
  .attr('height','700')
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const color = d3.scaleOrdinal<string, string>()
  .domain(data.map((d:any) => d.title))
  .range(['#ffcd56',
  '#ff6384',
  '#36a2eb',
  '#fd6b19',
  '#9b59b6',
  '#1abc9c',
  '#d35400',]);

  const pie = d3.pie<number>()
  .sort(null)
  .value((d, i) => budgetValues[i]);

  const arc = d3.arc<any, d3.DefaultArcObject>()
  .innerRadius(radius * 0.5)
  .outerRadius(radius * 0.9);

  const outerArc = d3.arc<any, d3.DefaultArcObject>()
  .innerRadius(radius * 1.2)
  .outerRadius(radius * 0.8);

  const arcs = svg.selectAll('.arc')
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'arc');

  arcs.append('path')
  .attr('d', (d: any) => {
    if (typeof d === 'object' && 'startAngle' in d && 'endAngle' in d) {
      return arc(d);
    }
    return '';

  })
  .style('fill', (d: any) => color(d.data.title))
  .attr('class','slice');

  const text = svg.selectAll('.labels')
  .data(pie(data))
  .enter()
  .append('text')
  .attr('dy', '.35em')
  .text(function (d:any) {
    return d.data.title;
  });

  function midAngle(d: { startAngle: number; endAngle: number;}) {
    return d.startAngle + (d.endAngle -d.startAngle) /2;
  }

  text.transition().duration(1000)
  .attr('transform', function(d:any) {
    var pos = outerArc.centroid(d);
    pos[0] = radius * 1.002 * (midAngle(d) < Math.PI ? 1 : -1);
    return `translate(${pos[0]},${pos[1]})`;
  })
  .style('text-anchor',function (d: any) {
    return midAngle(d) < Math.PI ? 'start' : 'end';
  });

  const polyline = svg.selectAll('.lines')
  .data(pie(data))
  .enter()
  .append('polyline');

  polyline.transition().duration(1000)
  .attr('points', function(d: any) {
    var pos = outerArc.centroid(d);
    pos[0] = radius * 1 * (midAngle(d) < Math.PI ? 1 : -1);
    return `${arc.centroid(d)},${outerArc.centroid(d)},${pos[0]},${pos[1]}`;
  });

}
}
