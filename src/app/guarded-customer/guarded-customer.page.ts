import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guarded-customer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      guarded-customer works!
    </p>
  `,
  styles: [
  ]
})
export class GuardedCustomerPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
