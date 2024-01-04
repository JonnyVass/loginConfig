import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes para ser Utilizados
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';
import { IntroComponent } from './components/intro/intro.component';
import { LogoComponent } from './components/logo/logo.component';
import { HistorysComponent  } from './components/historys/historys.component';
import { TeamComponent  } from './components/team/team.component';
import { InstalacionesComponent  } from './components/instalaciones/instalaciones.component';
import { PriceTableComponent  } from './components/price-table/price-table.component';
import { FloatingButtonComponent  } from './components/floating-button/floating-button.component';

import { FooterComponent  } from './components/footer/footer.component';

// importacion Librería de la barra de progreso
import { NgCircleProgressModule } from 'ng-circle-progress';



@NgModule({
  declarations: [
    AddUpdateTaskComponent,
    CustomInputComponent,
    HeaderComponent,
    IntroComponent,
    LogoComponent,
    HistorysComponent,
    TeamComponent,
    InstalacionesComponent,
    PriceTableComponent,
    FloatingButtonComponent,
    FooterComponent
      
  ],
  exports: [
    AddUpdateTaskComponent,
    CustomInputComponent,
    HeaderComponent,
    IntroComponent,
    LogoComponent,
    HistorysComponent,
    TeamComponent,
    InstalacionesComponent,
    PriceTableComponent,
    FloatingButtonComponent,
    FooterComponent,
    NgCircleProgressModule
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
