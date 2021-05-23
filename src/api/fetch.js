import { navigate } from "gatsby-link";
import client from "./client";

export const getNotes = (setNotes, setPreviewNotes) => {
    client.get("/home").then((res) => {
        res.data.notes.forEach((note) => (note["toggle"] = true));
        setNotes(res.data.notes);
        setPreviewNotes(res.data.notes.slice(0, 4));
    });
};

export const getTodolists = (setTodolists, setPreviewTodos) => {
    client.get("/home").then((res) => {
        if (res.data.todolists.length != 0) {
            res.data.todolists.forEach((tl) => {
                tl["toggle"] = true;
                tl["isUpdated"] = false;
                tl.todos.forEach((todo) => {
                    todo["toggle"] = true;
                    todo["isUpdated"] = false;
                });
            });
            setTodolists(res.data.todolists);
            setPreviewTodos(res.data.todolists[0].todos.slice(0, 4));
        }
    });
};

export const getUserData = (setter) => {
    client.get("/home").then((res) => {
        if (res.data == "no uid") {
            navigate("/login");
        } else {
            setter.setFolders(res.data.folders);
            setter.setBackground(res.data.backgroundImg.url);
            setter.setUnicorn(res.data.keepUnicorn);
            setter.setEmail(res.data.email);
            setter.setUsername(res.data.username);
            setter.setLocation(res.data.location);
            setter.setDisplayedBookmarks(res.data.folders[0].bookmarks);
            setter.setSelectedFolderId(res.data.folders[0]._id);
            setter.setLoading(false);
        }

    });
};