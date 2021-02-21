import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import EditBookForm from "../EditBookForm";
import EditListForm from "../EditListForm";
import PropTypes from "prop-types";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditModal(props) {

  EditModal.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    colorScheme: PropTypes.string,
    id: PropTypes.string.isRequired
  };
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <EditBookForm
      title={props.title}
      description={props.description}
      colorScheme={props.colorScheme}
      id={props.id}
      />
    </div>
  );

  const listBody = (
    <div style={modalStyle} className={classes.paper}>
      <EditListForm
      name={props.name}
      id={props.id}
      />
    </div>
  );

if(props.title){
  return (
    <div>
      <IconButton color="primary" aria-label="Edit Book" component="span" onClick={handleOpen} >
            <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
} else {
  return (
    <div>
      <IconButton color="primary" aria-label="Edit Book" component="span" onClick={handleOpen} >
            <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {listBody}
      </Modal>
    </div>
  );
}
}