import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let ListFilterPipe = class ListFilterPipe {
    transform(items, filter, custom) {
        if (!items || !filter || !!custom) {
            return items;
        }
        return items.filter((item) => this.applyFilter(item, filter));
    }
    applyFilter(item, filter) {
        return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
    }
};
ListFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'ng2ListFilter',
        pure: false
    })
], ListFilterPipe);
export { ListFilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1maWx0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGlzdC1maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFRcEQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUN2QixTQUFTLENBQUMsS0FBaUIsRUFBRSxNQUFnQixFQUFFLE1BQWdCO1FBQzNELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUMvQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQWMsRUFBRSxNQUFnQjtRQUN4QyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztDQUNKLENBQUE7QUFYWSxjQUFjO0lBSjFCLElBQUksQ0FBQztRQUNGLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxLQUFLO0tBQ2QsQ0FBQztHQUNXLGNBQWMsQ0FXMUI7U0FYWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMaXN0SXRlbSB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ25nMkxpc3RGaWx0ZXInLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIExpc3RGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKGl0ZW1zOiBMaXN0SXRlbVtdLCBmaWx0ZXI6IExpc3RJdGVtLCBjdXN0b20/OiBib29sZWFuKTogTGlzdEl0ZW1bXSB7XG4gICAgICAgIGlmICghaXRlbXMgfHwgIWZpbHRlciB8fCAhIWN1c3RvbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW06IExpc3RJdGVtKSA9PiB0aGlzLmFwcGx5RmlsdGVyKGl0ZW0sIGZpbHRlcikpO1xuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKGl0ZW06IExpc3RJdGVtLCBmaWx0ZXI6IExpc3RJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKGZpbHRlci50ZXh0ICYmIGl0ZW0udGV4dCAmJiBpdGVtLnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50ZXh0LnRvTG93ZXJDYXNlKCkpID09PSAtMSk7XG4gICAgfVxufVxuIl19