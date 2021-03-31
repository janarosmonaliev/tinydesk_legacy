// import React, { forwardRef, useImperativeHandle, useState } from "react";
// import { X } from "react-feather";
// import {
//   Dialog,
//   DialogTitle,
//   DialogActions,
//   DialogContent,
//   IconButton,
//   TextField,
//   Button,
// } from "@material-ui/core/";
// import { SvgIcon } from "@material-ui/core";

// const AccountSettings = (props) => {
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   useImperativeHandle(ref, () => ({
//     clickOpen: () => {
//       handleClickOpen();
//     },
//   }));
//   return (
//     // <>
//     //   <div className onClick={() => handleClickOpen()}>
//     //     <SvgIcon>
//     //       <Plus color="white" strokeWidth={1} />
//     //     </SvgIcon>
//     //     <small>Add Bookmark</small>
//     //   </div>

//     <Dialog
//       fullWidth
//       maxWidth="xs"
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="new-bookmark-dialog"
//     >
//       <DialogTitle id="new-bookmark-dialog">
//         <h5 className="dialog-title">Add a new bookmark</h5>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           size="small"
//           className="button-dialog-close"
//         >
//           <SvgIcon>
//             <X />
//           </SvgIcon>
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <form>
//           <TextField
//             required
//             id="new-bookmark-url"
//             label="Website URL"
//             fullWidth
//           />
//           <TextField id="new-bookmark-title" label="Title" fullWidth />
//           {/* TODO Visit link below for radio buttons  */}
//           {/* https://material-ui.com/components/radio-buttons/ */}
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant="contained"
//           color="primary"
//           disableElevation
//           disableTouchRipple
//           onClick={handleClose}
//         >
//           Save
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           disableElevation
//           disableTouchRipple
//           onClick={handleClose}
//         >
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//     //</>
//   );
// };
// export default AccountSettings;
