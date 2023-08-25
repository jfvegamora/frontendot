import React,{ Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

interface PersonProfileModalProps{
    isOpen: boolean
    closeModal: () => void;
}
 
export const PersonProfileModal:React.FC<PersonProfileModalProps> = ({
    isOpen,
    closeModal
}) => {
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <Fragment>

        {isOpen && (
            <>
                <Dialog open={isOpen} handler={handleOpen}>
                    <DialogHeader>Perfil Persona</DialogHeader>
                    <DialogBody divider className="h-[40rem] overflow-scroll">
                    <Typography className="font-normal">
                      Datos de la persona
                    </Typography>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={closeModal}>
                        close
                    </Button>
                    </DialogFooter>
                </Dialog>
            </>
        )}
    </Fragment>
  );
}