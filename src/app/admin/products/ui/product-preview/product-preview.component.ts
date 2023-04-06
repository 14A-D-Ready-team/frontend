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

@Component({
  selector: "app-admin-product-preview",
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

  @Input()
  public deleting = false;

  public apiUrl = environment.api.url;

  @Output()
  public cardClick = new EventEmitter<void>();

  @Output()
  public delete = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit() {
    if (!this.product) {
      throw new Error("The property product is required");
    }
  }

  public onDelete(event: any) {
    event.stopPropagation();
    this.delete.emit();
  }
}
