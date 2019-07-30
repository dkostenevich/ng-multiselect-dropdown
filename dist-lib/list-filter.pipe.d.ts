import { PipeTransform } from '@angular/core';
import { ListItem } from './multiselect.model';
export declare class ListFilterPipe implements PipeTransform {
    transform(items: ListItem[], filter: ListItem, custom?: boolean): ListItem[];
    applyFilter(item: ListItem, filter: ListItem): boolean;
}
