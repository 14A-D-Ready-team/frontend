import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Category, CategoryActions, CategoryState } from "@shared/category";
import { Observable, take, tap } from "rxjs";
import { CategoryEditorFormModel } from "../../utils";
import {
  DiscardEdit,
  LoadPage,
  SaveEdit,
  Edit,
  Delete,
  Reload,
  CategoriesListState,
} from "./store";
import { RefresherCustomEvent } from "@ionic/angular";
import { UpdateForm, UpdateFormValue } from "@ngxs/form-plugin";

interface CategoriesListFormModel {
  categories: FormArray<FormGroup<CategoryEditorFormModel>>;
}

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.page.html",
  styleUrls: ["./categories-list.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListPage implements OnInit {
  @Select(CategoriesListState.categories )
  public categories$!: Observable<Category[]>;

  @Select(CategoryState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.error)
  public error$!: Observable<any>;

  public form: FormGroup<CategoriesListFormModel>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = fb.group<CategoriesListFormModel>({
      categories: new FormArray<FormGroup<CategoryEditorFormModel>>([
        new FormGroup<CategoryEditorFormModel>({
          name: new FormControl("sdassda", { nonNullable: true }),
          id: new FormControl<number>(1, { nonNullable: true }),
        }),
        new FormGroup<CategoryEditorFormModel>({
          name: new FormControl("asdsadsdassd", { nonNullable: true }),

          id: new FormControl<number>(2, { nonNullable: true }),
        }),
        new FormGroup<CategoryEditorFormModel>({
          name: new FormControl("fhfggfg", { nonNullable: true }),

          id: new FormControl<number>(3, { nonNullable: true }),
        }),
        new FormGroup<CategoryEditorFormModel>({
          name: new FormControl("zthrfrr", { nonNullable: true }),

          id: new FormControl<number>(4, { nonNullable: true }),
        }),
        /* new FormGroup<CategoryEditorFormModel>({
          name: new FormControl(),
          id: new FormControl<number>(5, { nonNullable: true }),
        }),
        new FormGroup<CategoryEditorFormModel>({
          name: new FormControl(),
          id: new FormControl<number>(6, { nonNullable: true }),
        }), */
      ]),
    });
  }

  public ngOnInit() {
    this.store.dispatch(new LoadPage());
    this.store.select(CategoriesListState.form).subscribe(form => {
      console.log(form);
    });
  }

  public test() {
    this.form.controls.categories.controls.push(
      new FormGroup<CategoryEditorFormModel>({
        name: new FormControl("dsfdfsdfsfdsdfsdsfd", { nonNullable: true }),

        id: new FormControl<number>(5, { nonNullable: true }),
      }),
    );
  }

  public retryLoading() {
    this.store.dispatch(new Reload());
  }

  public handleRefresh(event: any) {
    const refresherEvent = event as RefresherCustomEvent;
    return this.store
      .dispatch(new Reload())
      .pipe(take(1))
      .subscribe(() => refresherEvent.detail.complete());
  }

  public onEditing(id: number) {
    this.store.dispatch(new Edit(id));
  }

  public onEditingDone(isSaved: boolean) {
    this.store.dispatch(isSaved ? new SaveEdit() : new DiscardEdit());
  }

  public onDelete(id: number) {
    this.store.dispatch(new Delete(id));
  }

  /* public categoryById(index: number, el: CategoryState): number {
    return el.category.id;
  } */
}
