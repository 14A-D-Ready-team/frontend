import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-product-filter-menu",
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: "./product-filter-menu.component.html",
  styleUrls: ["./product-filter-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterMenuComponent implements OnInit {
  @Input()
  public contentId!: string;

  public form = new FormGroup({
    categoryId: new FormControl<string | null>(null, {
      nonNullable: false,
    }),
  });

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  public reset(): void {
    this.form.reset();
  }
}
