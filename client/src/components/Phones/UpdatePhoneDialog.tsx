import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import React, { useState } from "react";

interface UpdatePhoneDialog {
  open: boolean;
  onCancel: Function;
  onConfirm: Function;
}
const UpdatePhoneDialog = (props: UpdatePhoneDialog) => {
  const [number, setNumber] = useState(``);
  const [type, setType] = useState(``);
  const [serial, setSerial] = useState(``);
  const [color, setColor] = useState(``);
  const [metadata, setMetadata] = useState(``);

  return (
    <Dialog open={props.open}>
      <DialogTitle>Update Phone</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setNumber(e.target.value)}
          label="Number"
        ></TextField>
        <TextField
          onChange={(e) => setType(e.target.value)}
          label="Type"
        ></TextField>
        <TextField
          onChange={(e) => setSerial(e.target.value)}
          label="Serial"
        ></TextField>
        <TextField
          onChange={(e) => setColor(e.target.value)}
          label="Color"
        ></TextField>
        <TextField
          onChange={(e) => setMetadata(e.target.value)}
          label="Metadata"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onCancel()}>Cancel</Button>
        <Button
          onClick={() =>
            props.onConfirm({
              number,
              type,
              serial,
              color,
              metadata: JSON.parse(metadata),
            })
          }
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePhoneDialog;
