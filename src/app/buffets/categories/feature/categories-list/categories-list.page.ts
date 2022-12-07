import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import {
  Category,
  CategoryState,
  EditCategoryDto,
  ApiRequestStatus,
} from "@shared/category";
import { Observable, take } from "rxjs";
import { CategoryEditorFormModel } from "../../utils";
import {
  StopEdit,
  LoadPage,
  SaveEdit,
  Edit,
  Delete,
  Reload,
  CategoriesListState,
  AddNew,
  editorFormPath,
  SaveNew,
  StopAddingNew,
} from "./store";
import {
  ActionSheetController,
  Platform,
  RefresherCustomEvent,
} from "@ionic/angular";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.page.html",
  styleUrls: ["./categories-list.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListPage implements OnInit {
  @Select(CategoriesListState.categories)
  public categories$!: Observable<Category[]>;

  @Select(CategoriesListState.creatingNew)
  public creatingNew$!: Observable<boolean>;

  @Select(CategoriesListState.editedId)
  public editedId$!: Observable<number>;

  @Select(CategoryState.updateStatus)
  public updateStatus$!: Observable<ApiRequestStatus | undefined>;

  @Select(CategoryState.createStatus)
  public createStatus$!: Observable<ApiRequestStatus | undefined>;

  @Select(CategoryState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.error)
  public error$!: Observable<any>;

  public editorForm: FormGroup<CategoryEditorFormModel>;

  public get editorFormPath() {
    return editorFormPath;
  }

  constructor(
    private store: Store,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
  ) {
    this.editorForm = new ClassValidatorFormGroup<CategoryEditorFormModel>(
      EditCategoryDto,
      {
        name: new ClassValidatorFormControl(""),
      },
    );
  }

  public ngOnInit() {
    this.store.dispatch(new LoadPage());
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

  public create() {
    this.store.dispatch(new AddNew());
  }

  public onCreatingDone(isSaved: boolean) {
    this.store.dispatch(isSaved ? new SaveNew() : new StopAddingNew());
  }

  public onEditing(category: Category) {
    this.store.dispatch(new Edit(category));
  }

  public onEditingDone(isSaved: boolean) {
    this.store.dispatch(isSaved ? new SaveEdit() : new StopEdit());
  }

  public async onDelete(category: Category) {
    if (!(await this.confirmDelete(category))) {
      return;
    }

    this.store.dispatch(new Delete(category.id));
  }

  public categoryById(index: number, el: Category): number {
    return el.id;
  }

  private async confirmDelete(category: Category): Promise<boolean> {
    if (this.platform.is("desktop")) {
      return this.showDeleteModal(category);
    } else {
      return this.showDeleteActionSheet(category.name);
    }
  }

  private async showDeleteModal(category: Category): Promise<boolean> {}

  private async showDeleteActionSheet(header: string): Promise<boolean> {
    const actionSheet = await this.actionSheetCtrl.create({
      header,
      buttons: [
        {
          text: "Törlés",
          role: "destructive",
          data: {
            action: "delete",
          },
        },
        {
          text: "Mégse",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
    actionSheet.present();
    return (await actionSheet.onDidDismiss()).data.action === "delete";
  }
}
