class Storage_ {
  constructor(id) {
    this.id = id;
    this.load();
  }

  items = [];
  isEmpty = true;

  dump(datalist) {
    this.items.push(...datalist);
    this.update();
  }

  getFirst() {
    return this.items[0];
  }

  getItem(id) {
    return this.items.find((item) => item.id === id);
  }

  addItem(item) {
    this.items.push(item);
    this.update();
  }

  deleteFirst() {
    this.items.shift();

    this.update();
  }

  deleteItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.update();
  }

  updateFirst(newItem) {
    this.items[0] = newItem;

    this.update();
  }

  updateItem(id, callback) {
    this.items.forEach((item) => {
      if (item.id === id) {
        callback(item);
        return;
      }
    });
    this.update();
  }

  filterItems(callback) {
    return this.items.filter(callback);
  }

  load() {
    this.items = JSON.parse(sessionStorage.getItem(this.id)) || [];
    this.isEmpty = this.items.length <= 0;
    return this.items;
  }

  update() {
    sessionStorage.setItem(this.id, JSON.stringify(this.items));
  }

  empty() {
    this.items = [];
    this.update();
  }
}
