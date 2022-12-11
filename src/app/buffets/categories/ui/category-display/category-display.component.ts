import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Category } from "@shared/category";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CategoryEditorFormModel, FirstErrorMessagePipe } from "../../utils";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";

@Component({
  selector: "app-buffets-category-display",
  styleUrls: ["./category-display.component.scss"],
  templateUrl: "./category-display.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FirstErrorMessagePipe,
  ],
})
export class CategoryDisplayComponent implements OnInit {
  @Input()
  public category!: Category;

  @Input()
  public isEditing = false;

  @Input()
  public isLoading = false;

  @Input()
  public editDisabled = false;

  @Input()
  public action: "create" | "update" = "update";

  @Input()
  public editorForm: FormGroup<CategoryEditorFormModel> | undefined;

  @Output()
  public editing = new EventEmitter<void>();

  @Output()
  public editingDone = new EventEmitter<boolean>();

  @Output()
  public delete = new EventEmitter<void>();

  public ngOnInit() {
    if (this.action === "update" && !this.category) {
      throw new Error("The property 'category' is required for update!");
    }
  }
}
