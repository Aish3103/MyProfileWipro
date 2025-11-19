import AppDispatcher from "./Dispatcher";

const BookActions = {
  addBook(book) {
    AppDispatcher.dispatch({
      type: "ADD_BOOK",
      payload: book,
    });
  },
};

export default BookActions;
