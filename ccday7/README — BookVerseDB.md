&nbsp;README — BookVerseDB :

This project is a MongoDB database created for the BookVerse application.

The goal is to store information about authors, books, users, and their ratings.

The database includes three main collections:

1. Authors

2\. Books

3\. Users

I used MongoDB Compass to create the database, insert data, and perform CRUD operations.



Database Name:->BookVerseDB

Collections and Structure

1\. Authors:Stores information about book authors.

Each document contains:

name

nationality

birthYear



2\. Users:

Stores people who are using the BookVerse app.

name

email

joinDate



3\. Books:

Stores information about books.

Each document contains:

title

genre

publicationYear

authorId 

ratings 



A rating includes:

user

score

comment



Data Inserted

3 authors

3 users

5 books



ObjectIds were automatically created by MongoDB.

CRUD Operations Performed

✔ Create

Inserted new users

Inserted new books

Added new rating to a book using $push

✔ Read

Retrieved all Science Fiction books

Retrieved books published after 2015

Found authors who wrote Fantasy books

✔ Update

Updated a book’s publication year

✔ Delete

Removed a user document





Exports:

The following files were exported from MongoDB Compass:



authors.json

books.json

users.json

These files contain all inserted documents.



Tools Used



MongoDB Compass

MongoDB Community Edition

Notes

###### All operations were performed directly in MongoDB Compass.

