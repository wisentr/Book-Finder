const functions = require("firebase-functions");
const fetch = require("node-fetch");
const cors = require("cors")({ origin: true });
const key = functions.config().booksapi.key;

exports.search = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.method !== "GET") {
      return response.status(401).json({
        message: "Not allowed",
      });
    }
    functions.logger.info("Search called.", { structuredData: true });
    const param = request.query.searchQuery;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${param}&key=${key}&maxResults=40&country=US`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return response.status(200).json({ message: data });
      })
      .catch((err) => {
        functions.logger.error("Error occured!", err);
        return response.status(500).json({ error: err });
      });
  });
});
