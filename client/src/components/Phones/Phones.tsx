import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import DeleteIcon from "@material-ui/icons/Delete";

import { phonesSDK } from "../../SDK";
import UpdatePhoneDialog from "./UpdatePhoneDialog";

interface Phone {
  _id: string;
  number: string;
  type: string;
  serial: string;
  color: string;
  metadata: object;
}

const phones: Array<any> = [];
const Phones = (props: any) => {
  const [phones, setPhones] = useState<Array<Phone>>([]);
  const [addNumber, setAddNumber] = useState(``);
  const [addType, setAddType] = useState(``);
  const [addSerial, setAddSerial] = useState(``);
  const [addColor, setAddColor] = useState(``);
  const [addMetadata, setAddMetadata] = useState<string | undefined>(``);

  const [showUpdatePhoneDialog, setShowUpdatePhoneDialog] = useState(false);
  const [selectedUpdatePhoneId, setSelectedUpdatePhoneId] =
    useState<string>(``);

  const openUpdatePhoneDialog = (_id: string) => {
    setSelectedUpdatePhoneId(_id);
    setShowUpdatePhoneDialog(true);
  };

  const onCancelUpdatePhoneDialog = () => {
    setSelectedUpdatePhoneId(``);
    setShowUpdatePhoneDialog(false);
  };

  const onConfirmUpdatePhoneDialog = async (phone: Phone) => {
    try {
      await phonesSDK.updatePhone(
        selectedUpdatePhoneId,
        phone.number,
        phone.type,
        phone.serial,
        phone.color,
        phone.metadata
      );
      setSelectedUpdatePhoneId(``);
      setShowUpdatePhoneDialog(false);
      getPhones();
    } catch (e) {
      console.error(e);
    }
  };

  const addPhone = async () => {
    const addPhoneResult = await phonesSDK.addPhone(
      addNumber,
      addType,
      addSerial,
      addColor,
      addMetadata
    );
    getPhones();
  };

  const getPhones = async () => {
    const getPhonesResult = await phonesSDK.getPhones();
    setPhones(getPhonesResult.data);
  };

  const deletePhone = async (_id: string) => {
    const getPhonesResult = await phonesSDK.deletePhone(_id);
    getPhones();
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <Paper>
      <Typography variant="h6" align="center">
        Add Phone:
      </Typography>
      <Grid container justify="space-around" alignItems="center">
        <Grid item>
          <TextField
            label="Number"
            onChange={(e) => setAddNumber(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Type"
            onChange={(e) => setAddType(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Serial"
            onChange={(e) => setAddSerial(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Color"
            onChange={(e) => setAddColor(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Metadata"
            onChange={(e) => setAddMetadata(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={addPhone}>
            Add
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" align="center">
        Phones:
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="th">Number</TableCell>
            <TableCell component="th">Type</TableCell>
            <TableCell component="th">Serial</TableCell>
            <TableCell component="th">Color</TableCell>
            <TableCell component="th">Metadata</TableCell>
            <TableCell component="th">Update</TableCell>
            <TableCell component="th">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {phones.map((phone, key) => (
            <TableRow key={phone._id}>
              <TableCell>{phone.number}</TableCell>
              <TableCell>{phone.type}</TableCell>
              <TableCell>{phone.serial}</TableCell>
              <TableCell>{phone.color}</TableCell>
              <TableCell>
                <ReactJson
                  src={phone.metadata}
                  collapsed={true}
                  displayDataTypes={false}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => openUpdatePhoneDialog(phone._id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => deletePhone(phone._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdatePhoneDialog
        open={showUpdatePhoneDialog}
        onCancel={onCancelUpdatePhoneDialog}
        onConfirm={onConfirmUpdatePhoneDialog}
      />
    </Paper>
  );
};

export default Phones;
