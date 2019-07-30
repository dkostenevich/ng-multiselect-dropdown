import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
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
    ListFilterPipe = tslib_1.__decorate([
        Pipe({
            name: 'ng2ListFilter',
            pure: false
        })
    ], ListFilterPipe);
    return ListFilterPipe;
}());
export { ListFilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1maWx0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGlzdC1maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFRcEQ7SUFBQTtJQVdBLENBQUM7SUFWRyxrQ0FBUyxHQUFULFVBQVUsS0FBaUIsRUFBRSxNQUFnQixFQUFFLE1BQWdCO1FBQS9ELGlCQUtDO1FBSkcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQy9CLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBYyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLElBQWMsRUFBRSxNQUFnQjtRQUN4QyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQVZRLGNBQWM7UUFKMUIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDO09BQ1csY0FBYyxDQVcxQjtJQUFELHFCQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGlzdEl0ZW0gfSBmcm9tICcuL211bHRpc2VsZWN0Lm1vZGVsJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICduZzJMaXN0RmlsdGVyJyxcbiAgICBwdXJlOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0RmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShpdGVtczogTGlzdEl0ZW1bXSwgZmlsdGVyOiBMaXN0SXRlbSwgY3VzdG9tPzogYm9vbGVhbik6IExpc3RJdGVtW10ge1xuICAgICAgICBpZiAoIWl0ZW1zIHx8ICFmaWx0ZXIgfHwgISFjdXN0b20pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtOiBMaXN0SXRlbSkgPT4gdGhpcy5hcHBseUZpbHRlcihpdGVtLCBmaWx0ZXIpKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcihpdGVtOiBMaXN0SXRlbSwgZmlsdGVyOiBMaXN0SXRlbSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIShmaWx0ZXIudGV4dCAmJiBpdGVtLnRleHQgJiYgaXRlbS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpO1xuICAgIH1cbn1cbiJdfQ==