import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const router = useRouter();

  const {startDraggingEntry, endDraggingEntry} = useContext(UIContext)

  const onDragStart = (e: DragEvent) => {
    startDraggingEntry(); //Set the dragging state to true

    //Set the entry id to the dataTransfer object
    e.dataTransfer.setData('entry', entry._id);
  }

  const onDragEnd = (e: DragEvent) => {
    endDraggingEntry();
  }

  const onCardClick = () => {
    router.push(`/entries/${entry._id}`);
  };



  return (
    <Card 
      sx={{ marginBottom: 1 }}
      //Drag Events
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onCardClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}
        >
          <Typography variant="body2">{dateFunctions.dateToNow(entry.createdAt)} ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
