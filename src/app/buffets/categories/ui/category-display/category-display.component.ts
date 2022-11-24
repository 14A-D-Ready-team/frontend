import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Category } from "@shared/category";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CategoryEditorFormModel } from "../../utils";

@Component({
  selector: "app-buffets-category-display",
  styleUrls: ["./category-display.component.scss"],
  templateUrl: "./category-display.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class CategoryDisplayComponent implements OnInit {
  // Might not be needed
  // WARNING: Changing the category's properties won't update the view due to OnPush, might need to use an observable
  @Input()
  public category!: Category;

  @Input()
  public isEditing = false;

  @Input()
  public editorForm!: FormGroup<CategoryEditorFormModel>;

  @Output()
  public editing = new EventEmitter<void>();

  @Output()
  public editingDone = new EventEmitter<boolean>();

  @Output()
  public delete = new EventEmitter<void>();

  constructor() {}

  public ngOnInit() {
    if (!this.category) {
      throw new Error("category property is required");
    }

    if (!this.editorForm) {
      throw new Error("editorForm property is required");
    }
  }
}
