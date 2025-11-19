import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BookActions from "../flux/BookActions";

const BookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price can't be negative"),
});

export default function AddBookForm() {
  const initialValues = { title: "", author: "", price: "" };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Add a new book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={BookSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          // convert price to number
          const payload = { ...values, price: Number(values.price) };
          BookActions.addBook(payload);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Title</label>
              <Field name="title" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="title" />
              </div>
            </div>

            <div>
              <label>Author</label>
              <Field name="author" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="author" />
              </div>
            </div>

            <div>
              <label>Price</label>
              <Field name="price" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="price" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Add Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
