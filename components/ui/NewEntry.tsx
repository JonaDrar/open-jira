import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { entriesApi } from '../../apis';

export const NewEntry = () => {

  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const {addNewEntry} = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const onTextInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const onSave = async () => {
    if (inputValue.length === 0) return
    addNewEntry(inputValue)
    setInputValue('')
    setTouched(false)
    setIsAddingEntry(false)
  }

  const onCancel = () => {
    setInputValue('')
    setTouched(false)
    setIsAddingEntry(false)
  }


  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginBottom: 1, marginTop: 2 }}
            placeholder="What are you working on?"
            multiline
            autoFocus
            label="What are you working on?"
            helperText="Enter a description of the task"
            value={inputValue}
            onChange={onTextInputChange}
            error={touched && inputValue.length === 0}
            onBlur={() => setTouched(true)}
          />
          <Box display={'flex'} justifyContent={'space-between'}>
            <Button
              variant="text"
              color="error"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveAsOutlinedIcon />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          sx={{ marginBottom: 1 }}
          onClick={() => setIsAddingEntry(true)}
        >
          Add new entry
        </Button>
      )}
    </Box>
  );
};
