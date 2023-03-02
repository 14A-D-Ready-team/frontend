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
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "@/environments/environment";
import { defaultThrottleConfig } from "rxjs/internal/operators/throttle";

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

  public apiUrl = environment.api.url;

  @Output()
  public cardClick = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit() {
    if (!this.product) {
      throw new Error("The property product is required");
    }
  }

  public delete(event: any) {
    event.stopPropagation();
  }
}
