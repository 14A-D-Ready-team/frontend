import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Category } from "@shared/product";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-buffets-category-display",
  styleUrls: [],
  template: `
    <ion-item>
      <p>anya</p>
    </ion-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule],
})
export class CategoryDisplayComponent implements OnInit {
  @Input()
  public category!: Category;

  constructor() {}

  public ngOnInit() {
    if (!this.category) {
      throw new Error("category property is required");
    }
  }
}
