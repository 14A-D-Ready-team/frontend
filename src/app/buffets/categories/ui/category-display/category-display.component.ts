import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Category } from "@shared/product";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-buffets-category-display",
  styleUrls: ["./category-display.component.scss"],
  templateUrl: "./category-display.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CategoryDisplayComponent implements OnInit {
  @Input()
  public category!: Category;

  @Input()
  public isEditing = false;

  @Output()
  public editing = new EventEmitter<void>();

  @Output()
  public editingStopped = new EventEmitter<boolean>();

  constructor() {}

  public ngOnInit() {
    if (!this.category) {
      throw new Error("category property is required");
    }
  }
}
