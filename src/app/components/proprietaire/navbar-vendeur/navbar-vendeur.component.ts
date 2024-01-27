import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-vendeur',
  templateUrl: './navbar-vendeur.component.html',
  styleUrls: ['./navbar-vendeur.component.css']
})
export class NavbarVendeurComponent {

  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar(){
    this.toggleSidebarEvent.emit();
  }

}
