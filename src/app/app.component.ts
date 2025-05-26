import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketComponent } from './components/ticket/ticket.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TicketComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SQLink-test';
}
