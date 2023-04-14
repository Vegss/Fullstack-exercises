import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import EntryForm from './EntryForm';

interface EntryModalProps {
  formOpen: boolean;
  handleClose: () => void;
  type: string;
}

const AddEntryModal = (props: EntryModalProps) => {
  const { formOpen, handleClose, type } = props

  return (
    <Dialog fullWidth open={formOpen} onClose={handleClose}>
      <DialogTitle>Create Entry: </DialogTitle>
      <DialogContent>
        {
          type &&
          <EntryForm type={type} />
        }
      </DialogContent>
    </Dialog>
  )
}

export default AddEntryModal