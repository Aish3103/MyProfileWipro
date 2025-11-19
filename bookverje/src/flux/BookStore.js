import AppDispatcher from "./Dispatcher";

class BookStore {
  constructor(initial = []) {
    this._books = initial;
    this._listeners = new Set();

    // Register with dispatcher
    this._token = AppDispatcher.register(this._onDispatch.bind(this));
  }

  // Dispatcher callback
  _onDispatch(action) {
    switch (action.type) {
      case "ADD_BOOK":
        this._addBookInternal(action.payload);
        this._emitChange();
        break;
      default:
      // noop
    }
  }

  _addBookInternal(book) {
    // make sure book has required fields (store-level guard)
    if (!book.title || !book.author || book.price == null) return;
    // add id for simplicity
    const id = Date.now().toString();
    this._books = [{ id, ...book }, ...this._books];
  }

  getBooks() {
    // return a shallow copy to avoid outside mutation
    return [...this._books];
  }

  addChangeListener(fn) {
    this._listeners.add(fn);
  }

  removeChangeListener(fn) {
    this._listeners.delete(fn);
  }

  _emitChange() {
    for (const fn of this._listeners) fn();
  }
}

// Export factory so DI can create new instances for tests
export default function createBookStore(initial = []) {
  return new BookStore(initial);
}
