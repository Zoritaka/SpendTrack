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

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      category: this.category,
      price: this.price,
    };
  }

  static fromJSON(data: any): ShoppingItem {
    return new ShoppingItem(data.name, data.description, data.category, data.price);
  }
}

class ShoppingList {
  id: string;
  name: string;
  date: Date;
  items: ShoppingItem[];

  constructor(name: string) {
    this.id = UUID.v4() as string;
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

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      date: this.date.toISOString(),
      items: this.items.map(item => item.toJSON()),
    };
  }

  static fromJSON(data: any): ShoppingList {
    const list = new ShoppingList(data.name);
    list.id = data.id;
    list.date = new Date(data.date);
    list.items = data.items.map((itemData: any) => ShoppingItem.fromJSON(itemData));
    return list;
  }
}

export { ShoppingList, ShoppingItem };
