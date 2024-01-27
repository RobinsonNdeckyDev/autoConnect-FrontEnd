import { Component, OnInit  } from '@angular/core';
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent {

    public chart: any;

    ngOnInit(): void {
      this.createChart();
    }

  createChart(){

      this.chart = new Chart("MonChart", {
      type: 'doughnut',

      data: {
        labels: ['Propriétaires', 'Annonces'],
        datasets: [
          {
            data: [467, 576],
            backgroundColor: ['black', '#0F42A8'],
          },
        ],
      },
      options: {
        aspectRatio: 2, // Ajuste la hauteur du graphique
        cutout: '70%', // Ajuste la taille du trou au milieu du donut
        plugins: {
          legend: {
            display: true,
            position: 'bottom', // Place la légende en bas
          },
        },
      },
    });

  }



}


