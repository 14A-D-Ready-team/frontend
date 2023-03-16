import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { AuthState } from '@shared/authentication';
import { Buffet, BuffetState } from '@shared/buffet';
import { User } from '@shared/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild("loginModal") modal!: IonModal;

  selectedSegment = "login";

  constructor(private route: ActivatedRoute) { }

  @Select(AuthState.user)
  public activeUser$!: Observable<User>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }

  cancel() {
    this.modal.dismiss(null, "cancel");
  }

  ngOnInit() {
    this.selectedSegment = "login";
  }

}
