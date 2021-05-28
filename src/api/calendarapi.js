import client from "./client";

export const apiAddNewEvent = (data) => {
  const promise = new Promise((resolve) => {
    client
      .post("/home/calendar/", data)
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

export const apiDeleteEvent = (payload) => {
  console.log("check right id ", payload.remove);
  client
    .delete("/home/calendar/", { data: payload })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeEventDate = (data) => {
  client
    .put("/home/calendar/dates", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeEventTitle = (data) => {
  client
    .put("/home/calendar/title", data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
