import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed'];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter();

  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<EntryStatus>(entry.status);

  const onTextInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) {
      setTouched(true);
      return;
    }
    const updatedEntry = {
      ...entry,
      description: inputValue,
      status,
    };
    updateEntry(updatedEntry);
    setTouched(false);
    router.push('/');
  };

  const deleteAlert = () => {
    if (confirm('Are you sure you want to delete this entry?')) {
      onDelete();
    }
  };

  const onDelete = () => {
    deleteEntry(entry._id);
    router.push('/');
  };

  const isNotValid = useMemo(() => {
    return touched && inputValue.length === 0;
  }, [inputValue, touched]);

  return (
    <Layout title={entry.description.substring(0, 20) + '...'}>
      <Grid container justifyContent={'center'} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${inputValue}`}
              subheader={`Created ${dateFunctions.dateToNow(
                entry.createdAt
              )} ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New Entry"
                multiline
                autoFocus
                label="New Entry"
                helperText={isNotValid && 'Entry cannot be empty'}
                value={inputValue}
                onChange={onTextInputChange}
                error={isNotValid}
                onBlur={() => setTouched(true)}
              />
              <FormControl fullWidth>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                fullWidth
                startIcon={<SaveAsOutlinedIcon />}
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Button
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          width: 65,
          height: 65,
          borderRadius: '50%',
        }}
        variant="outlined"
        color="error"
        onClick={deleteAlert}
      >
        <DeleteOutlinedIcon />
      </Button>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry: {
        ...entry,
        _id: entry._id.toString(),
      },
    },
  };
};

export default EntryPage;
