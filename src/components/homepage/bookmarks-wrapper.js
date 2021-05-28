import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Bookmark from "./bookmark";
import produce from "immer";
import { UserContext } from "./context/UserContext";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { BookmarkContext } from "./context/BookmarkContext";
import AddBookmark from "./add-bookmark";

const SortableBookmark = SortableElement(({ value }) => (
  <Grid item xs={4} md={3} lg={2} zeroMinWidth>
    <Bookmark
      thumbnail={value.thumbnail}
      title={value.title}
      url={value.url}
      _id={value._id}
      color={value.color}
    />
  </Grid>
));
const SortableList = SortableContainer(({ items }) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        style={{ overflow: "auto" }}
      >
        {items.map((value, index) => (
          <SortableBookmark
            key={`bookmark-sort-${index}`}
            index={index}
            value={value}
          />
        ))}

        <Grid item xs={4} md={3} lg={2} zeroMinWidth>
          <AddBookmark key="add-bookmark-button"></AddBookmark>
        </Grid>
      </Grid>
    </>
  );
});

const BookmarksWrapper = () => {
  const { jiggle, setFolders, folders, selectedFolderId } = useContext(
    UserContext
  );

  const [selectedFolderIndex, setSelectedFolderIndex] = useState(0);
  const [contextMenuBookmarkId, setContextMenuBookmarkId] = useState("");
  const [edit, setEdit] = useState(false);

  //Populated from here to "reuse" the add Bookmark modal as edit bookmark modal
  const [open, setOpen] = useState(false);
  const [url, setURL] = useState("https://www.");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  //Context menu's initial position
  const initialMousPos = {
    mouseX: null,
    mouseY: null,
  };
  //Decide Context menu's position
  const [mousePos, setMousePos] = useState(initialMousPos);

  useEffect(() => {
    setSelectedFolderIndex(
      folders.findIndex((f) => f._id === selectedFolderId)
    );
  }, [selectedFolderId]);
  const handleContextMenu = (e, _id) => {
    if (_id != null) {
      setContextMenuBookmarkId(_id);
    }
    e.preventDefault();
    //If contextmenu is already opened, just close it
    if (mousePos.mouseX != null) {
      setMousePos(initialMousPos);
    } else {
      setMousePos({
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
      });
    }
  };
  const handleContextMenuClose = () => {
    setMousePos(initialMousPos);
  };
  const handleContextMenuEdit = () => {
    setMousePos(initialMousPos);
    setEdit(true);

    setOpen(true);
    const folderIndex = folders.findIndex(
      (folder) => folder._id === selectedFolderId
    );
    const bookmarkIndex = folders[folderIndex].bookmarks.findIndex(
      (bm) => bm._id === contextMenuBookmarkId
    );
    const selectedBookmark = folders[folderIndex].bookmarks[bookmarkIndex];
    setURL(selectedBookmark.url);
    setTitle(selectedBookmark.title);
    setColor(selectedBookmark.color);
  };

  const bookmarkContext = {
    contextMenuBookmarkId,
    setContextMenuBookmarkId,
    mousePos,
    setMousePos,
    handleContextMenu,
    handleContextMenuClose,
    handleContextMenuEdit,
    edit,
    setEdit,
    open,
    setOpen,
    url,
    setURL,
    title,
    setTitle,
    color,
    setColor,
  };
  const onSortEnd = ({ oldIndex, newIndex }, e) => {
    const folderIndex = folders.findIndex(
      (folder) => folder._id === selectedFolderId
    );

    //If bookmark is moved to folder
    if (e.target.className === "folder-title") {
      //== because they can have different type
      if (e.target.id == selectedFolderId) {
        return;
      }
      const destinationFolderIndex = folders.findIndex(
        // == because they can have different type
        (f) => f._id == e.target.id
      );
      const movingBookmark = folders[folderIndex].bookmarks[oldIndex];

      //Delete bookmark
      setFolders(
        produce((draft) => {
          draft[folderIndex].bookmarks.splice(
            draft[folderIndex].bookmarks.findIndex(
              (bm) => bm._id === movingBookmark._id
            ),
            1
          );
        })
      );
      //Move bookmark
      setFolders(
        produce((draft) => {
          draft[destinationFolderIndex].bookmarks.push(movingBookmark);
        })
      );
    }
    //If rearranging bookmarks order
    else {
      const arr = arrayMove(
        folders[selectedFolderIndex].bookmarks,
        oldIndex,
        newIndex
      );

      setFolders(
        produce((draft) => {
          draft[folderIndex].bookmarks = arr;
        })
      );
    }
  };
  return (
    <BookmarkContext.Provider value={bookmarkContext}>
      {jiggle ? (
        <>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {folders[selectedFolderIndex].bookmarks &&
              folders[selectedFolderIndex].bookmarks.map((bookmark, index) => (
                <Grid
                  item
                  xs={4}
                  md={3}
                  lg={2}
                  zeroMinWidth
                  className={jiggle ? "bookmarks-jiggle" : ""}
                  key={`jiggle-bookmark-${index}`}
                >
                  <Bookmark
                    thumbnail={bookmark.thumbnail}
                    title={bookmark.title}
                    url={bookmark.url}
                    id={bookmark.id}
                    color={bookmark.color}
                  />
                </Grid>
              ))}
            <Grid item xs={4} md={3} lg={2} zeroMinWidth>
              <AddBookmark></AddBookmark>
            </Grid>
          </Grid>
        </>
      ) : (
        <SortableList
          items={folders[selectedFolderIndex].bookmarks}
          onSortEnd={onSortEnd}
          axis="xy"
          distance={5}
          jiggle={jiggle}
        />
      )}
    </BookmarkContext.Provider>
  );
};
export default React.memo(BookmarksWrapper);
