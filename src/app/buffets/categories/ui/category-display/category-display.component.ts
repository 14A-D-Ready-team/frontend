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
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CategoryEditorFormModel } from "../../utils";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";

@Component({
  selector: "app-buffets-category-display",
  styleUrls: ["./category-display.component.scss"],
  templateUrl: "./category-display.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class CategoryDisplayComponent implements OnInit {
  @Input()
  public category!: Category;

  @Input()
  public isEditing = false;

  @Input()
  public editorForm: FormGroup<CategoryEditorFormModel> | undefined;

  @Output()
  public editing = new EventEmitter<void>();

  @Output()
  public editingDone = new EventEmitter<boolean>();

  @Output()
  public delete = new EventEmitter<void>();

  public form = new FormGroup<CategoryEditorFormModel>({
    name: new FormControl("asasd", { nonNullable: true }),
    id: new FormControl<number>(1, { nonNullable: true }),
  });

  /*   public category$: Observable<Category>;

  public form$: Observable<FormGroup<CategoryEditorFormModel>>;

  private editorFormSubject: BehaviorSubject<
    FormGroup<CategoryEditorFormModel> | undefined
  >;

  private categorySubject: BehaviorSubject<Category | undefined>; */

  constructor() {
    /*  this.editorFormSubject = new BehaviorSubject<
      FormGroup<CategoryEditorFormModel> | undefined
    >(undefined);

    this.categorySubject = new BehaviorSubject<Category | undefined>(undefined);

    this.form$ = combineLatest([this.category$, this.editorFormSubject]).pipe(
      map(([category, editorForm]) => {
        if (editorForm) {
          return editorForm;
        }

        const group = new FormGroup<CategoryEditorFormModel>({
          name: new FormControl(category.name + "ASD", { nonNullable: true }),
          id: new FormControl<number>(category.id, { nonNullable: true }),
        });
        group.disable();
        return group;
      }),
    ); */
  }

  public ngOnInit() {
    if (!this.category) {
      throw new Error("category property is required");
    }
  }
}
