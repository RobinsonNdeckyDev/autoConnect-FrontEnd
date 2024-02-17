import { Component } from '@angular/core';
// import { MdbAccordionModule } from 'mdbootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

  
  homeCollapsed: boolean = true;
  dashboardCollapsed: boolean = true;

  constructor() {}

  toggleCollapse(panel: string) {
    if (panel === 'home') {
      this.dashboardCollapsed = true; // Fermer le panneau Dashboard si ouvert
      this.homeCollapsed = !this.homeCollapsed; // Inverser l'état du panneau Home
    } else if (panel === 'dashboard') {
      this.homeCollapsed = true; // Fermer le panneau Home si ouvert
      this.dashboardCollapsed = !this.dashboardCollapsed; // Inverser l'état du panneau Dashboard
    }
  }

  ngOnInit(): void {}
}


