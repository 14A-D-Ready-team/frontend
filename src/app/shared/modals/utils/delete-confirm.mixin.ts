import {
  ActionSheetController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { DeleteConfirmModalComponent } from "../ui/delete-confirm-modal/delete-confirm-modal.component";

export abstract class DeleteConfirmMixin {
  protected abstract actionSheetController: ActionSheetController;
  protected abstract modalController: ModalController;
  protected abstract platform: Platform;

  protected async confirmDelete(subject: string): Promise<boolean> {
    const message = `Biztosan törölni szeretné a(z) ${subject}?`;
    if (this.platform.is("desktop")) {
      return this.showDeleteModal(message);
    } else {
      return this.showDeleteActionSheet(message);
    }
  }

  protected async showDeleteModal(message: string): Promise<boolean> {
    const modal = await this.modalController.create({
      component: DeleteConfirmModalComponent,
      componentProps: {
        message,
      },
    });
    modal.present();
    return (await modal.onDidDismiss()).role === "confirm";
  }

  protected async showDeleteActionSheet(header: string): Promise<boolean> {
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
