import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Category, CategoryState, EditCategoryDto } from "@shared/category";
import { combineLatest, map, Observable, take } from "rxjs";
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
  ModalController,
  Platform,
  RefresherCustomEvent,
} from "@ionic/angular";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { DeleteConfirmModalComponent } from "@shared/modals";
import {
  TargetedRequestStatus,
  ApiRequestStatus,
} from "@shared/extended-entity-state/utils";

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
  public updateStatus$!: Observable<TargetedRequestStatus | undefined>;

  @Select(CategoryState.createStatus)
  public createStatus$!: Observable<ApiRequestStatus | undefined>;

  @Select(CategoryState.deleteStatus)
  public deleteStatus$!: Observable<TargetedRequestStatus | undefined>;

  @Select(CategoryState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.error)
  public error$!: Observable<any>;

  public vm$ = combineLatest([
    this.categories$,
    this.creatingNew$,
    this.editedId$,
    this.updateStatus$,
    this.createStatus$,
    this.deleteStatus$,
    this.loading$,
    this.error$,
  ]).pipe(
    map(
      ([
        categories,
        creatingNew,
        editedId,
        updateStatus,
        createStatus,
        deleteStatus,
        loading,
        error,
      ]) => ({
        categories,
        creatingNew,
        editedId,
        updateStatus,
        deleteStatus,
        createPending: createStatus?.loading === true,
        loading,
        error,
      }),
    ),
  );

  public editorForm: FormGroup<CategoryEditorFormModel>;

  public get editorFormPath() {
    return editorFormPath;
  }

  constructor(
    private store: Store,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
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
    const message = `Biztosan törölni szeretné a(z) ${category.name} kategóriát?`;
    if (this.platform.is("desktop")) {
      return this.showDeleteModal(message);
    } else {
      return this.showDeleteActionSheet(message);
    }
  }

  private async showDeleteModal(message: string): Promise<boolean> {
    const modal = await this.modalController.create({
      component: DeleteConfirmModalComponent,
      componentProps: {
        message,
      },
    });
    modal.present();
    return (await modal.onDidDismiss()).role === "confirm";
  }

  private async showDeleteActionSheet(header: string): Promise<boolean> {
    const actionSheet = await this.actionSheetController.create({
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
    return (await actionSheet.onDidDismiss())?.data?.action === "delete";
  }
}
