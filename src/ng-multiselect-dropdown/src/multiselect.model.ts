export interface IDropdownSettings {
  singleSelection?: boolean;
  idField?: string;
  textField?: string;
  enableCheckAll?: boolean;
  selectAllText?: string;
  unSelectAllText?: string;
  allowSearchFilter?: boolean;
  clearSearchFilter?: boolean;
  customSearchFilter?: boolean;
  maxHeight?: number;
  itemsShowLimit?: number;
  limitSelection?: number;
  searchPlaceholderText?: string;
  noDataAvailablePlaceholderText?: string;
  closeDropDownOnSelection?: boolean;
  showSelectedItemsAtTop?: boolean;
  defaultOpen?: boolean;
  class?: string;
}

export class ListItem {
  id: String;
  text: String;

  public constructor(source: any) {
    if (typeof source === 'string') {
      this.id = this.text = source;
    }
    if (typeof source === 'object') {
      this.id = source.id;
      this.text = source.text;
    }
  }
}
