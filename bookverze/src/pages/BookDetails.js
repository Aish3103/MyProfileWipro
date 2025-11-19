import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AuthorInfo from "../components/AuthorInfo";
import withLoader from "../components/withLoader";

const AuthorWithLoader = withLoader(AuthorInfo);

export default function BookDetails() {
  const { id } = useParams();               
  const [book, setBook] = useState(null);   
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log("Fetching:", `http://localhost:3001/books/${id}`);

    axios
      .get(`http://localhost:3001/books/${id}`)
      .then(res => {
        console.log("RESPONSE:", res.data);
        setBook(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("ERROR:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mt-4 fade">
      <Link to="/home" className="btn btn-primary mb-3">⬅ Back</Link>

      <AuthorWithLoader loading={loading} book={book} />
    </div>
  );
}
