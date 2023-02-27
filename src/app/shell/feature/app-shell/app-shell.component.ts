import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    
    <ion-router-outlet></ion-router-outlet>
  `,
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
