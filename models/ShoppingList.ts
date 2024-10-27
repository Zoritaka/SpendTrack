// models/ShoppingList.ts
import UUID from 'react-native-uuid';

class ShoppingItem {
  name: string;
  description: string;
  category: string;
  price: number;

  constructor(name: string, description: string, category: string, price: number) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
  }
}

class ShoppingList {
  id: string;
  name: string;
  date: Date;
  items: ShoppingItem[];

  constructor(name: string) {
    this.id = UUID.v4() as string; // Используем react-native-uuid для генерации UUID
    this.name = name;
    this.date = new Date();
    this.items = [];
  }

  addItem(item: ShoppingItem) {
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

export { ShoppingList, ShoppingItem };