/* eslint-disable no-underscore-dangle */
import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule, IonMenu, MenuController } from "@ionic/angular";

// Workaround for ionic issue #24907
// https://github.com/ionic-team/ionic-framework/issues/24907#issuecomment-1153232882
@Component({
  selector: "app-menu-wrapper",
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: ` <ng-content select="ion-menu"></ng-content> `,
  styles: [],
})
export class MenuWrapperComponent implements AfterViewInit {
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
    if (this.viewInitialized) {
      this.menuCtrl.enable(!value, this.menu.menuId);
    }
  }

  @ContentChild(IonMenu)
  public menu!: IonMenu;

  private viewInitialized = false;

  private _disabled = false;

  constructor(private menuCtrl: MenuController) {}

  public ngAfterViewInit() {
    this.menu.disabled = true;
    this.viewInitialized = true;
    this.menuCtrl.enable(!this._disabled, this.menu.menuId);
  }
}
