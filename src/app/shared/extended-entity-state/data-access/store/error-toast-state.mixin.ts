import { Platform, ToastController } from "@ionic/angular";
import { ExceptionService } from "@shared/exceptions";

export abstract class ErrorToastState {
  protected abstract toastController: ToastController;

  protected abstract exceptionService: ExceptionService;

  protected abstract platform: Platform;

  protected async showErrorToast(error: any) {
    const toast = await this.toastController.create({
      duration: 2000,
      message: this.exceptionService.getErrorMessage(error),
      header: "Sikertelen mentés",
      color: "danger",
      position: this.platform.width() > 600 ? "top" : "bottom",
    });
    toast.present();
  }
}
