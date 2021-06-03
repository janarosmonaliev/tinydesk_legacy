import client from "./client";

export const apiAddBookmark = (data) => {
  const promise = new Promise((resolve) => {
    client
      .post("/home/bookmarks/", data)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return promise;
};

export const apiDeleteBookmark = (payload) => {
  client
    .delete("/home/bookmarks/", { data: payload })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiUpdateBookmark = (data) => {
  client
    .put("/home/bookmarks/", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeBookmarkPosition = (data) => {
  client
    .put("/home/bookmarks/order", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};