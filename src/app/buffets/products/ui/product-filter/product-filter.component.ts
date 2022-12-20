import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-product-filter",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
