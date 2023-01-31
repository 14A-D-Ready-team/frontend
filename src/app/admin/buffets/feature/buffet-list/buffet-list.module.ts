import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuffetListRoutingModule } from './buffet-list-routing.module';
import { BuffetListPage } from './buffet-list.page';
import { BuffetsListState } from './store/buffet-list.state';
import { BuffetsListEffects } from './store/buffet-list.effects';
import { BuffetPreviewComponent, BuffetPreviewSkeletonComponent, TypingOverlayComponent } from '../../ui';
import { IonicModule } from '@ionic/angular';
import { NglrxPipesModule } from '@nglrx/pipes';
import { NgxsModule } from '@ngxs/store';
import { ErrorCardComponent } from '@shared/exceptions/ui/ionic';
import { NgxsEffectsModule } from 'ngxs-effects';
import { BuffetFilterModule } from '../buffet-filter/buffet-filter.module';


@NgModule({
  declarations: [BuffetListPage],
  imports: [
    CommonModule,
    BuffetListRoutingModule,
    IonicModule,
    NglrxPipesModule,
    // NgxsModule.forFeature([BuffetsListState, BuffetFilterState]),
    NgxsModule.forFeature([BuffetsListState]),
    NgxsEffectsModule.forFeature(BuffetsListEffects),
    BuffetListRoutingModule,
    BuffetFilterModule,
    BuffetPreviewComponent,
    BuffetPreviewSkeletonComponent,
    ErrorCardComponent,
    TypingOverlayComponent,
  ]
})
export class BuffetListModule { }
