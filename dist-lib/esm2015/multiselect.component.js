import * as tslib_1 from "tslib";
import { Component, HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItem } from './multiselect.model';
export const DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
};
const noop = () => { };
const ɵ0 = noop;
let MultiSelectComponent = class MultiSelectComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this._data = [];
        this.selectedItems = [];
        this.isDropdownOpen = true;
        this._placeholder = 'Select';
        this.filter = new ListItem(this.data);
        this.defaultSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'text',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: false,
            customSearchFilter: false,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 999999999999,
            searchPlaceholderText: 'Search',
            noDataAvailablePlaceholderText: 'No data available',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false,
            class: 'multiselect-dropdown'
        };
        this.disabled = false;
        this.onFilterChange = new EventEmitter();
        this.onDropDownOpen = new EventEmitter();
        this.onDropDownClose = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    set placeholder(value) {
        if (value) {
            this._placeholder = value;
        }
        else {
            this._placeholder = 'Select';
        }
    }
    set settings(value) {
        this._settings = Object.assign(this.defaultSettings, value || {});
    }
    set data(value) {
        if (!value) {
            this._data = [];
        }
        else {
            this._data = value.map((item) => typeof item === 'string'
                ? new ListItem(item)
                : new ListItem({
                    id: item[this._settings.idField],
                    text: item[this._settings.textField]
                }));
        }
    }
    onFilterTextChange($event) {
        this.onFilterChange.emit($event);
    }
    onItemClick($event, item) {
        if (this.disabled) {
            return false;
        }
        const found = this.isSelected(item);
        const allowAdd = this._settings.limitSelection === -1 ||
            (this._settings.limitSelection > 0 &&
                this.selectedItems.length < this._settings.limitSelection);
        if (!found) {
            if (allowAdd) {
                this.addSelected(item);
            }
        }
        else {
            this.removeSelected(item);
        }
        if (this._settings.singleSelection &&
            this._settings.closeDropDownOnSelection) {
            this.closeDropdown();
        }
    }
    writeValue(value) {
        if (value !== undefined && value !== null && value.length > 0) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        const firstItem = value[0];
                        this.selectedItems = [
                            typeof firstItem === 'string'
                                ? new ListItem(firstItem)
                                : new ListItem({
                                    id: firstItem[this._settings.idField],
                                    text: firstItem[this._settings.textField]
                                })
                        ];
                    }
                }
                catch (e) {
                    // console.error(e.body.msg);
                }
            }
            else {
                const _data = value.map((item) => typeof item === 'string'
                    ? new ListItem(item)
                    : new ListItem({
                        id: item[this._settings.idField],
                        text: item[this._settings.textField]
                    }));
                if (this._settings.limitSelection > 0) {
                    this.selectedItems = _data.splice(0, this._settings.limitSelection);
                }
                else {
                    this.selectedItems = _data;
                }
            }
        }
        else {
            this.selectedItems = [];
        }
        this.onChangeCallback(value);
    }
    // From ControlValueAccessor interface
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    // Set touched on blur
    onTouched() {
        this.closeDropdown();
        this.onTouchedCallback();
    }
    trackByFn(index, item) {
        return item.id;
    }
    isSelected(clickedItem) {
        let found = false;
        this.selectedItems.forEach(item => {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    }
    isLimitSelectionReached() {
        return this._settings.limitSelection === this.selectedItems.length;
    }
    isAllItemsSelected() {
        return this._data.length === this.selectedItems.length;
    }
    showButton() {
        if (!this._settings.singleSelection) {
            if (this._settings.limitSelection > 0) {
                return false;
            }
            // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
            return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
        }
        else {
            // should be disabled in single selection mode
            return false;
        }
    }
    itemShowRemaining() {
        return this.selectedItems.length - this._settings.itemsShowLimit;
    }
    addSelected(item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    }
    removeSelected(itemSel) {
        this.selectedItems.forEach(item => {
            if (itemSel.id === item.id) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    }
    emittedValue(val) {
        const selected = [];
        if (Array.isArray(val)) {
            val.map(item => {
                if (item.id === item.text) {
                    selected.push(item.text);
                }
                else {
                    selected.push(this.objectify(item));
                }
            });
        }
        else {
            if (val) {
                if (val.id === val.text) {
                    return val.text;
                }
                else {
                    return this.objectify(val);
                }
            }
        }
        return selected;
    }
    objectify(val) {
        const obj = {};
        obj[this._settings.idField] = val.id;
        obj[this._settings.textField] = val.text;
        return obj;
    }
    toggleDropdown(evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this._settings.defaultOpen = !this._settings.defaultOpen;
        if (!this._settings.defaultOpen) {
            this.onDropDownClose.emit();
        }
        else {
            this.onDropDownOpen.emit();
        }
    }
    closeDropdown() {
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
        if (!this._settings.defaultOpen) {
            return;
        }
        this._settings.defaultOpen = false;
        this.onDropDownClose.emit();
    }
    toggleSelectAll() {
        if (this.disabled) {
            return false;
        }
        if (!this.isAllItemsSelected()) {
            this.selectedItems = this._data.slice();
            this.onSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        else {
            this.selectedItems = [];
            this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], MultiSelectComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MultiSelectComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], MultiSelectComponent.prototype, "settings", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array),
    tslib_1.__metadata("design:paramtypes", [Array])
], MultiSelectComponent.prototype, "data", null);
tslib_1.__decorate([
    Output('onFilterChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], MultiSelectComponent.prototype, "onFilterChange", void 0);
tslib_1.__decorate([
    Output('onDropDownOpen'),
    tslib_1.__metadata("design:type", EventEmitter)
], MultiSelectComponent.prototype, "onDropDownOpen", void 0);
tslib_1.__decorate([
    Output('onDropDownClose'),
    tslib_1.__metadata("design:type", EventEmitter)
], MultiSelectComponent.prototype, "onDropDownClose", void 0);
tslib_1.__decorate([
    Output('onSelect'),
    tslib_1.__metadata("design:type", EventEmitter)
], MultiSelectComponent.prototype, "onSelect", void 0);
tslib_1.__decorate([
    Output('onDeSelect'),
    tslib_1.__metadata("design:type", EventEmitter)
], MultiSelectComponent.prototype, "onDeSelect", void 0);
tslib_1.__decorate([
    Output('onSelectAll'),
    tslib_1.__metadata("design:type", EventEmitter)
], MultiSelectComponent.prototype, "onSelectAll", void 0);
tslib_1.__decorate([
    Output('onDeSelectAll'),
    tslib_1.__metadata("design:type", EventEmitter)
], MultiSelectComponent.prototype, "onDeSelectAll", void 0);
tslib_1.__decorate([
    HostListener('blur'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MultiSelectComponent.prototype, "onTouched", null);
MultiSelectComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-multiselect-dropdown',
        template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" [ngClass]=\"_settings.class\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span class=\"dropdonw-icon\">\n        <span class=\"remaining\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"_settings.defaultOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!_settings.defaultOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" aria-label=\"multiselect-select-all\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_settings.allowSearchFilter\">\n        <input type=\"text\" aria-label=\"multiselect-search\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter:_settings.customSearchFilter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" aria-label=\"multiselect-item\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\" />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>",
        providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".multiselect-dropdown{position:relative;width:100%;font-size:inherit;font-family:inherit}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none;padding-top:2px;padding-left:2px;color:#fff}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-icon{float:right!important;padding-right:4px}.multiselect-dropdown .dropdown-btn .dropdown-icon .remaining{padding-right:6px}.multiselect-dropdown .disabled>span{background-color:#eceeef}.multiselect-dropdown .dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.multiselect-dropdown .dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.multiselect-dropdown .dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.multiselect-dropdown .dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.multiselect-dropdown .dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.multiselect-dropdown .dropdown-list .filter-textbox input:focus{outline:0}.multiselect-dropdown .multiselect-item-checkbox{border-bottom:1px solid #ccc;padding:10px}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:active+div:before{-webkit-transition-duration:0s;transition-duration:0s}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:\"\";color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;-webkit-transition:.4s;transition:.4s}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:\"\";position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;-webkit-transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-webkit-border-image:none;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:\"\";-webkit-transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef])
], MultiSelectComponent);
export { MultiSelectComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vIiwic291cmNlcyI6WyJtdWx0aXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFxQixNQUFNLHFCQUFxQixDQUFDO0FBRWxFLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFRO0lBQ2xELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFDRixNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7O0FBU3RCLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBdUYvQixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXJGbkMsVUFBSyxHQUFvQixFQUFFLENBQUM7UUFDNUIsa0JBQWEsR0FBb0IsRUFBRSxDQUFDO1FBQ3BDLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzdCLGlCQUFZLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLFdBQU0sR0FBYSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0Msb0JBQWUsR0FBc0I7WUFDbkMsZUFBZSxFQUFFLEtBQUs7WUFDdEIsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsTUFBTTtZQUNqQixjQUFjLEVBQUUsSUFBSTtZQUNw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TSxDQUFDLGdCQUFnQixDQUFDO3NDQUNULFlBQVk7NERBQXFDO0FBRWpFO0lBREMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO3NDQUNULFlBQVk7NkRBQXFDO0FBR2xFO0lBREMsTUFBTSxDQUFDLFVBQVUsQ0FBQztzQ0FDVCxZQUFZO3NEQUFxQztBQUczRDtJQURDLE1BQU0sQ0FBQyxZQUFZLENBQUM7c0NBQ1QsWUFBWTt3REFBcUM7QUFHN0Q7SUFEQyxNQUFNLENBQUMsYUFBYSxDQUFDO3NDQUNULFlBQVk7eURBQW1EO0FBRzVFO0lBREMsTUFBTSxDQUFDLGVBQWUsQ0FBQztzQ0FDVCxZQUFZOzJEQUFtRDtBQXdGOUU7SUFEQyxZQUFZLENBQUMsTUFBTSxDQUFDOzs7O3FEQUlwQjtBQXpLVSxvQkFBb0I7SUFQaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHlCQUF5QjtRQUNuQywreUVBQTRDO1FBRTVDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1FBQzVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDOzZDQXdGeUIsaUJBQWlCO0dBdkYvQixvQkFBb0IsQ0E0U2hDO1NBNVNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IExpc3RJdGVtLCBJRHJvcGRvd25TZXR0aW5ncyB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xuXG5leHBvcnQgY29uc3QgRFJPUERPV05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbXVsdGlzZWxlY3QtZHJvcGRvd24nLFxuICB0ZW1wbGF0ZVVybDogJy4vbXVsdGktc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbXVsdGktc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0RST1BET1dOX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHVibGljIF9zZXR0aW5nczogSURyb3Bkb3duU2V0dGluZ3M7XG4gIHB1YmxpYyBfZGF0YTogQXJyYXk8TGlzdEl0ZW0+ID0gW107XG4gIHB1YmxpYyBzZWxlY3RlZEl0ZW1zOiBBcnJheTxMaXN0SXRlbT4gPSBbXTtcbiAgcHVibGljIGlzRHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgX3BsYWNlaG9sZGVyID0gJ1NlbGVjdCc7XG4gIGZpbHRlcjogTGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW0odGhpcy5kYXRhKTtcbiAgZGVmYXVsdFNldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncyA9IHtcbiAgICBzaW5nbGVTZWxlY3Rpb246IGZhbHNlLFxuICAgIGlkRmllbGQ6ICdpZCcsXG4gICAgdGV4dEZpZWxkOiAndGV4dCcsXG4gICAgZW5hYmxlQ2hlY2tBbGw6IHRydWUsXG4gICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxuICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXG4gICAgYWxsb3dTZWFyY2hGaWx0ZXI6IGZhbHNlLFxuICAgIGN1c3RvbVNlYXJjaEZpbHRlcjogZmFsc2UsXG4gICAgbGltaXRTZWxlY3Rpb246IC0xLFxuICAgIGNsZWFyU2VhcmNoRmlsdGVyOiB0cnVlLFxuICAgIG1heEhlaWdodDogMTk3LFxuICAgIGl0ZW1zU2hvd0xpbWl0OiA5OTk5OTk5OTk5OTksXG4gICAgc2VhcmNoUGxhY2Vob2xkZXJUZXh0OiAnU2VhcmNoJyxcbiAgICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ6ICdObyBkYXRhIGF2YWlsYWJsZScsXG4gICAgY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBzaG93U2VsZWN0ZWRJdGVtc0F0VG9wOiBmYWxzZSxcbiAgICBkZWZhdWx0T3BlbjogZmFsc2UsXG4gICAgY2xhc3M6ICdtdWx0aXNlbGVjdC1kcm9wZG93bidcbiAgfTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gJ1NlbGVjdCc7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzZXR0aW5ncyh2YWx1ZTogSURyb3Bkb3duU2V0dGluZ3MpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHZhbHVlIHx8IHt9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogQXJyYXk8YW55Pikge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlLm1hcChcbiAgICAgICAgKGl0ZW06IGFueSkgPT5cbiAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ29uRmlsdGVyQ2hhbmdlJylcbiAgb25GaWx0ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnb25Ecm9wRG93bk9wZW4nKVxuICBvbkRyb3BEb3duT3BlbjogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdvbkRyb3BEb3duQ2xvc2UnKVxuICBvbkRyb3BEb3duQ2xvc2U6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvblNlbGVjdCcpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25EZVNlbGVjdCcpXG4gIG9uRGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvblNlbGVjdEFsbCcpXG4gIG9uU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8TGlzdEl0ZW0+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcblxuICBAT3V0cHV0KCdvbkRlU2VsZWN0QWxsJylcbiAgb25EZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgb25GaWx0ZXJUZXh0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UuZW1pdCgkZXZlbnQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG9uSXRlbUNsaWNrKCRldmVudDogYW55LCBpdGVtOiBMaXN0SXRlbSkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLmlzU2VsZWN0ZWQoaXRlbSk7XG4gICAgY29uc3QgYWxsb3dBZGQgPVxuICAgICAgdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IC0xIHx8XG4gICAgICAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwICYmXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgaWYgKGFsbG93QWRkKSB7XG4gICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQoaXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQoaXRlbSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJlxuICAgICAgdGhpcy5fc2V0dGluZ3MuY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uXG4gICAgKSB7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSB2YWx1ZVswXTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtcbiAgICAgICAgICAgICAgdHlwZW9mIGZpcnN0SXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShmaXJzdEl0ZW0pXG4gICAgICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICBpZDogZmlyc3RJdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlLmJvZHkubXNnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgX2RhdGEgPSB2YWx1ZS5tYXAoXG4gICAgICAgICAgKGl0ZW06IGFueSkgPT5cbiAgICAgICAgICAgIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxuICAgICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgICBpZDogaXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSxcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDApIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBfZGF0YS5zcGxpY2UoMCwgdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gU2V0IHRvdWNoZWQgb24gYmx1clxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIG9uVG91Y2hlZCgpIHtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICB0cmFja0J5Rm4oaW5kZXgsIGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5pZDtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoY2xpY2tlZEl0ZW06IExpc3RJdGVtKSB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoY2xpY2tlZEl0ZW0uaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIGlzQWxsSXRlbXNTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5sZW5ndGggPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gIH1cblxuICBzaG93QnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMuX3NldHRpbmdzLmVuYWJsZUNoZWNrQWxsID0gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IC0xID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7IC8vICF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiYgdGhpcy5fc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgdGhpcy5fZGF0YS5sZW5ndGggPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzaG91bGQgYmUgZGlzYWJsZWQgaW4gc2luZ2xlIHNlbGVjdGlvbiBtb2RlXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaXRlbVNob3dSZW1haW5pbmcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCAtIHRoaXMuX3NldHRpbmdzLml0ZW1zU2hvd0xpbWl0O1xuICB9XG5cbiAgYWRkU2VsZWN0ZWQoaXRlbTogTGlzdEl0ZW0pIHtcbiAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZShpdGVtKSk7XG4gIH1cblxuICByZW1vdmVTZWxlY3RlZChpdGVtU2VsOiBMaXN0SXRlbSkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW1TZWwuaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZSh0aGlzLnNlbGVjdGVkSXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIHRoaXMub25EZVNlbGVjdC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKGl0ZW1TZWwpKTtcbiAgfVxuXG4gIGVtaXR0ZWRWYWx1ZSh2YWw6IGFueSk6IGFueSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbS50ZXh0KSB7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaChpdGVtLnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdGVkLnB1c2godGhpcy5vYmplY3RpZnkoaXRlbSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICBpZiAodmFsLmlkID09PSB2YWwudGV4dCkge1xuICAgICAgICAgIHJldHVybiB2YWwudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RpZnkodmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gIH1cblxuICBvYmplY3RpZnkodmFsOiBMaXN0SXRlbSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgIG9ialt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSA9IHZhbC5pZDtcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXSA9IHZhbC50ZXh0O1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW4gPSAhdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW47XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3Blbikge1xuICAgICAgdGhpcy5vbkRyb3BEb3duQ2xvc2UuZW1pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uRHJvcERvd25PcGVuLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKCkge1xuICAgIC8vIGNsZWFyIHNlYXJjaCB0ZXh0XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLmNsZWFyU2VhcmNoRmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci50ZXh0ID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NldHRpbmdzLmRlZmF1bHRPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5vbkRyb3BEb3duQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0FsbEl0ZW1zU2VsZWN0ZWQoKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5fZGF0YS5zbGljZSgpO1xuICAgICAgdGhpcy5vblNlbGVjdEFsbC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gIH1cbn1cbiJdfQ==