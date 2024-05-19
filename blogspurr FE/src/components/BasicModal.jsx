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
  border:0,
  p:4
};

const style1 = {
  color: "white",
  border:0
};

export default function BasicModal({ isLoading }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isLoading]);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="span">
            <CircularProgress sx={style1} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
