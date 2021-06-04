import { navigate } from "gatsby-link";
import client from "./client";
import moment from "moment";
import { convertFromRaw } from "draft-js";
export const getUserData = (setter) => {
  client.get("/home").then((res) => {
    if (res.data == "no uid") {
      navigate("/login");
    } else {
      setter.setFolders(res.data.folders);
      setter.setBackground(res.data.backgroundImg.url);
      setter.setInitialBackground(res.data.backgroundImg.url);
      setter.setUnicorn(res.data.keepUnicorn);
      setter.setEmail(res.data.email);
      setter.setUsername(res.data.username);
      setter.setLocation(res.data.location);
      setter.setSelectedFolderId(res.data.folders[0]._id);
      res.data.events.forEach((event) => {
        event.start = moment(event.start).toDate();
        event.end = moment(event.end).toDate();
      });
      setter.setEvents(res.data.events);

      if (res.data.todolists.length != 0) {
        res.data.todolists.forEach((tl) => {
          tl["toggle"] = true;
          tl.todos.forEach((todo) => {
            todo["toggle"] = true;
          });
        });
        setter.setTodolists(res.data.todolists);
      }
      if (res.data.notes.length != 0) {
        res.data.notes.forEach((note) => {
          note["toggle"] = true;
          note["isUpdated"] = false;
          note.content = convertFromRaw(JSON.parse(note.content));
        });
      }
      setter.setNotes(res.data.notes);

      setter.setLoading(false);
    }
  });
};
