import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Category } from "@shared/category";
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  of,
  scan,
  startWith,
} from "rxjs";
import { CategoryEditorFormModel } from "../../utils";
import { StartEditing } from "./store";

interface CategoryState {
  category: Category;
  isEditing: boolean;
}

interface CategoriesListFormModel {
  categories: FormArray<FormGroup<CategoryEditorFormModel>>;
}

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.page.html",
  styleUrls: ["./categories-list.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListPage {
  public categories$ = of([
    new Category(1, "Italok"),
    new Category(2, "Péksütemények"),
  ]);

  private isEditingSubject = new BehaviorSubject<{
    id: number;
    isEditing: boolean;
  } | null>(null);

  public isEditing$ = this.isEditingSubject.pipe(
    filter((x): x is { id: number; isEditing: boolean } => x !== null),
    scan((acc, curr) => {
      acc[curr.id] = curr.isEditing;
      return acc;
    }, {} as { [key: number]: boolean }),
    startWith({} as { [key: number]: boolean }),
  );

  public vm$ = combineLatest([this.categories$, this.isEditing$]).pipe(
    map(x => {
      const [categories, isEditing] = x;

      return {
        categoryState: categories.map(
          category =>
            ({
              category,
              isEditing: isEditing[category.id],
            } as CategoryState),
        ),
      };
    }),
  );

  public form: FormGroup<CategoriesListFormModel>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = fb.group<CategoriesListFormModel>({
      categories: new FormArray<FormGroup<CategoryEditorFormModel>>([
        new FormGroup<CategoryEditorFormModel>({ name: new FormControl() }),
        new FormGroup<CategoryEditorFormModel>({ name: new FormControl() }),
      ]),
    });
    store.select(state => console.log(state)).subscribe();
  }

  public onIonInfinite(event: any) {
    console.log(event);
  }

  public onEditing(category: Category) {
    this.isEditingSubject.next({ id: category.id, isEditing: true });
  }

  public onEditingDone(category: Category, isSaved: boolean) {
    this.isEditingSubject.next({ id: category.id, isEditing: false });
    this.store.dispatch(new StartEditing(category.id));
  }

  public onDelete(category: Category) {
    console.log(category);
  }

  public categoryById(index: number, el: CategoryState): number {
    return el.category.id;
  }
}
