import React, { Component } from "react";

export default class AuthorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      topBooks: []
    };
  }

  componentDidMount() {
    this.loadAuthorData(this.props.authorName);
  }

  componentDidUpdate(prevProps) {
    // Only reload if authorName changed
    if (prevProps.authorName !== this.props.authorName) {
      this.loadAuthorData(this.props.authorName);
    }
  }

  loadAuthorData(name) {
    const data = {
      "James Clear": {
        bio: "James Clear is an expert on habits and behavior psychology.",
        books: ["Atomic Habits", "Transform Your Habits", "Mastering Habits"]
      },
      "Yuval Noah Harari": {
        bio: "Historian and philosopher, bestselling author of Sapiens.",
        books: ["Sapiens", "Homo Deus", "21 Lessons for the 21st Century"]
      },
      "Paulo Coelho": {
        bio: "Brazilian lyricist and novelist, author of The Alchemist.",
        books: ["The Alchemist", "The Pilgrimage", "Brida"]
      }
    };

    const info = data[name];

    if (info) {
      this.setState({
        bio: info.bio,
        topBooks: info.books
      });
    }
  }

  render() {
    const { authorName } = this.props;
    const { bio, topBooks } = this.state;

    return (
      <div className="card p-3 shadow-sm">
        <h4>{authorName}</h4>
        <p className="text-muted">{bio}</p>

        <h6 className="mt-3">Top Books:</h6>
        <ul>
          {topBooks.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    );
  }
}
