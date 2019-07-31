import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from './multiselect.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { ListFilterPipe } from './list-filter.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
  entryComponents: [MultiSelectComponent],
  exports: [MultiSelectComponent]
})

export class NgMultiSelectDropDownModule {
}
