import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Product } from "@shared/product";
import { Category } from "@shared/category";

@Component({
  selector: "app-product-preview",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule],
  templateUrl: "./product-preview.component.html",
  styleUrls: ["./product-preview.component.scss"],
})
export class ProductPreviewComponent implements OnInit {
  @Input()
  public product!: Product;

  @Input()
  public category?: Category;

  @Input()
  public categoryLoading = false;

  @Output()
  public cardClick = new EventEmitter<void>();

  constructor() {}

  public ngOnInit() {
    if (!this.product) {
      throw new Error("The property product is required");
    }
  }
}
