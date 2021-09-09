import client from "./client";

export const apiAddNewEvent = (data) => {
  const promise = new Promise((resolve) => {
    client
      .post("/home/calendar/", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return promise;
};

export const apiDeleteEvent = (payload) => {
  client
    .delete("/home/calendar/", { data: payload })

    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeEventDate = (data) => {
  client.put("/home/calendar/dates", data).catch((error) => {
    console.log(error);
  });
};

export const apiChangeEventTitle = (data) => {
  client.put("/home/calendar/title", data).catch((err) => console.log(err));
};
