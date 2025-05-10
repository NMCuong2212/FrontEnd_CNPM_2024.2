import { Injectable } from "@angular/core";

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  role: string;
}

const MENUITEMS: Menu[] = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', role: '' },
  { state: 'category', name: 'Manage Category', type: 'link', icon: 'category', role: 'admin' }, //admin
  { state: 'product', name: 'Manage Product', type: 'link', icon: 'inventory_2', role: 'admin' }, //admin
  { state: 'order', name: 'Manage Order', type: 'link', icon: 'shopping_cart', role: '' }, 
  { state: 'shop', name: 'Manage Shop', type: 'link', icon: 'room', role: 'admin' }, //admin
  { state: 'user', name: 'Manage User', type: 'link', icon: 'people', role: 'admin' }//admin
];

@Injectable()
export class MenuItems {
  getMenuItem(): Menu[] {
    return MENUITEMS;
  }
}
