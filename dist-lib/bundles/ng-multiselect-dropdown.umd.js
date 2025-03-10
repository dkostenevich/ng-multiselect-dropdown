(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-multiselect-dropdown', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (global = global || self, factory(global['ng-multiselect-dropdown'] = {}, global.ng.core, global.ng.forms, global.ng.common));
}(this, function (exports, core, forms, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    var ListItem = /** @class */ (function () {
        function ListItem(source) {
            if (typeof source === 'string') {
                this.id = this.text = source;
            }
            if (typeof source === 'object') {
                this.id = source.id;
                this.text = source.text;
            }
        }
        return ListItem;
    }());

    var DROPDOWN_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MultiSelectComponent; }),
        multi: true
    };
    var noop = function () { };
    var MultiSelectComponent = /** @class */ (function () {
        function MultiSelectComponent(cdr) {
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
            this.onFilterChange = new core.EventEmitter();
            this.onDropDownOpen = new core.EventEmitter();
            this.onDropDownClose = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
            this.onDeSelect = new core.EventEmitter();
            this.onSelectAll = new core.EventEmitter();
            this.onDeSelectAll = new core.EventEmitter();
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
        }
        Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
            set: function (value) {
                if (value) {
                    this._placeholder = value;
                }
                else {
                    this._placeholder = 'Select';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiSelectComponent.prototype, "settings", {
            set: function (value) {
                this._settings = Object.assign(this.defaultSettings, value || {});
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiSelectComponent.prototype, "data", {
            set: function (value) {
                var _this = this;
                if (!value) {
                    this._data = [];
                }
                else {
                    this._data = value.map(function (item) {
                        return typeof item === 'string'
                            ? new ListItem(item)
                            : new ListItem({
                                id: item[_this._settings.idField],
                                text: item[_this._settings.textField]
                            });
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        MultiSelectComponent.prototype.onFilterTextChange = function ($event) {
            this.onFilterChange.emit($event);
        };
        MultiSelectComponent.prototype.onItemClick = function ($event, item) {
            if (this.disabled) {
                return false;
            }
            var found = this.isSelected(item);
            var allowAdd = this._settings.limitSelection === -1 ||
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
        };
        MultiSelectComponent.prototype.writeValue = function (value) {
            var _this = this;
            if (value !== undefined && value !== null && value.length > 0) {
                if (this._settings.singleSelection) {
                    try {
                        if (value.length >= 1) {
                            var firstItem = value[0];
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
                    var _data = value.map(function (item) {
                        return typeof item === 'string'
                            ? new ListItem(item)
                            : new ListItem({
                                id: item[_this._settings.idField],
                                text: item[_this._settings.textField]
                            });
                    });
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
        };
        // From ControlValueAccessor interface
        MultiSelectComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        // From ControlValueAccessor interface
        MultiSelectComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedCallback = fn;
        };
        MultiSelectComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        // Set touched on blur
        MultiSelectComponent.prototype.onTouched = function () {
            this.closeDropdown();
            this.onTouchedCallback();
        };
        MultiSelectComponent.prototype.trackByFn = function (index, item) {
            return item.id;
        };
        MultiSelectComponent.prototype.isSelected = function (clickedItem) {
            var found = false;
            this.selectedItems.forEach(function (item) {
                if (clickedItem.id === item.id) {
                    found = true;
                }
            });
            return found;
        };
        MultiSelectComponent.prototype.isLimitSelectionReached = function () {
            return this._settings.limitSelection === this.selectedItems.length;
        };
        MultiSelectComponent.prototype.isAllItemsSelected = function () {
            return this._data.length === this.selectedItems.length;
        };
        MultiSelectComponent.prototype.showButton = function () {
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
        };
        MultiSelectComponent.prototype.itemShowRemaining = function () {
            return this.selectedItems.length - this._settings.itemsShowLimit;
        };
        MultiSelectComponent.prototype.addSelected = function (item) {
            if (this._settings.singleSelection) {
                this.selectedItems = [];
                this.selectedItems.push(item);
            }
            else {
                this.selectedItems.push(item);
            }
            this.onChangeCallback(this.emittedValue(this.selectedItems));
            this.onSelect.emit(this.emittedValue(item));
        };
        MultiSelectComponent.prototype.removeSelected = function (itemSel) {
            var _this = this;
            this.selectedItems.forEach(function (item) {
                if (itemSel.id === item.id) {
                    _this.selectedItems.splice(_this.selectedItems.indexOf(item), 1);
                }
            });
            this.onChangeCallback(this.emittedValue(this.selectedItems));
            this.onDeSelect.emit(this.emittedValue(itemSel));
        };
        MultiSelectComponent.prototype.emittedValue = function (val) {
            var _this = this;
            var selected = [];
            if (Array.isArray(val)) {
                val.map(function (item) {
                    if (item.id === item.text) {
                        selected.push(item.text);
                    }
                    else {
                        selected.push(_this.objectify(item));
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
        };
        MultiSelectComponent.prototype.objectify = function (val) {
            var obj = {};
            obj[this._settings.idField] = val.id;
            obj[this._settings.textField] = val.text;
            return obj;
        };
        MultiSelectComponent.prototype.toggleDropdown = function (evt) {
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
        };
        MultiSelectComponent.prototype.closeDropdown = function () {
            // clear search text
            if (this._settings.clearSearchFilter) {
                this.filter.text = '';
            }
            if (!this._settings.defaultOpen) {
                return;
            }
            this._settings.defaultOpen = false;
            this.onDropDownClose.emit();
        };
        MultiSelectComponent.prototype.toggleSelectAll = function () {
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
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], MultiSelectComponent.prototype, "placeholder", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MultiSelectComponent.prototype, "disabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MultiSelectComponent.prototype, "settings", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Array),
            __metadata("design:paramtypes", [Array])
        ], MultiSelectComponent.prototype, "data", null);
        __decorate([
            core.Output('onFilterChange'),
            __metadata("design:type", core.EventEmitter)
        ], MultiSelectComponent.prototype, "onFilterChange", void 0);
        __decorate([
            core.Output('onDropDownOpen'),
            __metadata("design:type", core.EventEmitter)
        ], MultiSelectComponent.prototype, "onDropDownOpen", void 0);
        __decorate([
            core.Output('onDropDownClose'),
            __metadata("design:type", core.EventEmitter)
        ], MultiSelectComponent.prototype, "onDropDownClose", void 0);
        __decorate([
            core.Output('onSelect'),
            __metadata("design:type", core.EventEmitter)
        ], MultiSelectComponent.prototype, "onSelect", void 0);
        __decorate([
            core.Output('onDeSelect'),
            __metadata("design:type", core.EventEmitter)
        ], MultiSelectComponent.prototype, "onDeSelect", void 0);
        __decorate([
            core.Output('onSelectAll'),
            __metadata("design:type", core.EventEmitter)
        ], MultiSelectComponent.prototype, "onSelectAll", void 0);
        __decorate([
            core.Output('onDeSelectAll'),
            __metadata("design:type", core.EventEmitter)
        ], MultiSelectComponent.prototype, "onDeSelectAll", void 0);
        __decorate([
            core.HostListener('blur'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MultiSelectComponent.prototype, "onTouched", null);
        MultiSelectComponent = __decorate([
            core.Component({
                selector: 'ng-multiselect-dropdown',
                template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" [ngClass]=\"_settings.class\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span class=\"dropdown-icon\">\n        <span class=\"remaining\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"_settings.defaultOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!_settings.defaultOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" aria-label=\"multiselect-select-all\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_settings.allowSearchFilter\">\n        <input type=\"text\" aria-label=\"multiselect-search\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter:_settings.customSearchFilter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" aria-label=\"multiselect-item\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\" />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>",
                providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".multiselect-dropdown{position:relative;width:100%;font-size:inherit;font-family:inherit}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none;padding-top:2px;padding-left:2px;color:#fff}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-icon{float:right!important;padding-right:4px}.multiselect-dropdown .dropdown-btn .dropdown-icon .remaining{padding-right:6px}.multiselect-dropdown .disabled>span{background-color:#eceeef}.multiselect-dropdown .dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.multiselect-dropdown .dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.multiselect-dropdown .dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.multiselect-dropdown .dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.multiselect-dropdown .dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.multiselect-dropdown .dropdown-list .filter-textbox input:focus{outline:0}.multiselect-dropdown .multiselect-item-checkbox{border-bottom:1px solid #ccc;padding:10px}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:active+div:before{-webkit-transition-duration:0s;transition-duration:0s}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:\"\";color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;-webkit-transition:.4s;transition:.4s}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:\"\";position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;-webkit-transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-webkit-border-image:none;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:\"\";-webkit-transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-dropdown .multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"]
            }),
            __metadata("design:paramtypes", [core.ChangeDetectorRef])
        ], MultiSelectComponent);
        return MultiSelectComponent;
    }());

    var ClickOutsideDirective = /** @class */ (function () {
        function ClickOutsideDirective(_elementRef) {
            this._elementRef = _elementRef;
            this.clickOutside = new core.EventEmitter();
        }
        ClickOutsideDirective.prototype.onClick = function (event, targetElement) {
            if (!targetElement) {
                return;
            }
            var clickedInside = this._elementRef.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.clickOutside.emit(event);
            }
        };
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], ClickOutsideDirective.prototype, "clickOutside", void 0);
        __decorate([
            core.HostListener('document:click', ['$event', '$event.target']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [MouseEvent, HTMLElement]),
            __metadata("design:returntype", void 0)
        ], ClickOutsideDirective.prototype, "onClick", null);
        ClickOutsideDirective = __decorate([
            core.Directive({
                selector: '[clickOutside]'
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], ClickOutsideDirective);
        return ClickOutsideDirective;
    }());

    var ListFilterPipe = /** @class */ (function () {
        function ListFilterPipe() {
        }
        ListFilterPipe.prototype.transform = function (items, filter, custom) {
            var _this = this;
            if (!items || !filter || !!custom) {
                return items;
            }
            return items.filter(function (item) { return _this.applyFilter(item, filter); });
        };
        ListFilterPipe.prototype.applyFilter = function (item, filter) {
            return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
        };
        ListFilterPipe = __decorate([
            core.Pipe({
                name: 'ng2ListFilter',
                pure: false
            })
        ], ListFilterPipe);
        return ListFilterPipe;
    }());

    var NgMultiSelectDropDownModule = /** @class */ (function () {
        function NgMultiSelectDropDownModule() {
        }
        NgMultiSelectDropDownModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, forms.FormsModule],
                declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
                entryComponents: [MultiSelectComponent],
                exports: [MultiSelectComponent]
            })
        ], NgMultiSelectDropDownModule);
        return NgMultiSelectDropDownModule;
    }());

    exports.MultiSelectComponent = MultiSelectComponent;
    exports.NgMultiSelectDropDownModule = NgMultiSelectDropDownModule;
    exports.ɵa = DROPDOWN_CONTROL_VALUE_ACCESSOR;
    exports.ɵb = ClickOutsideDirective;
    exports.ɵc = ListFilterPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng-multiselect-dropdown.umd.js.map
