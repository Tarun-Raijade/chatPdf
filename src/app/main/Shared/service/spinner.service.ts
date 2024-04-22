import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner/progress-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerOverlayRef: OverlayRef = this.cdkSpinnerOverlay();

  constructor(private overlay: Overlay) { }

  /**
   * Createing an overlay
   */
  private cdkSpinnerOverlay(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
  }

  /**
   * Show spinner
   */
  showSpinner(): void {
    console.log("in spinner");
    
    if (!this.spinnerOverlayRef.hasAttached()) {
      console.log("IN IF");
      
      this.spinnerOverlayRef.attach(new ComponentPortal(ProgressSpinnerComponent));
    }
  }

  /**
   * Stop spinner
   */
  stopSpinner(): void {
    setTimeout(() => {
      this.spinnerOverlayRef.detach();
    }, 500);
  }

  /**
   * Check if spinner overlay is attached or not
   * @returns TRUE/FALSE
   */
  isAttached = (): Boolean => this.spinnerOverlayRef.hasAttached();
}
