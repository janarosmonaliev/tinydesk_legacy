import client from "./client";

export const getNotes = () => {
  client.get();
};
