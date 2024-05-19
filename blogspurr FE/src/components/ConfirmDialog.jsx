import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: 2,
  p: 4,
  background: "white",
  color: "black",
  borderColor: "red",
};

export default function ConfirmDialog({ open, setOpen, setAgree, message }) {
  return (
    <div className="bg-white">
      <Modal
        className=""
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>{message}</p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setOpen(false)}
              className=" px-3 py-1 bg-slate-200 rounded text-black"
            >
              Cancel
            </button>
            <button
              onClick={() => setAgree(true)}
              className=" px-3 py-1 bg-red-600 rounded text-black"
            >
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
