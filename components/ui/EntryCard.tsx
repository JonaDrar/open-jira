import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const {startDraggingEntry, endDraggingEntry} = useContext(UIContext)

  const onDragStart = (e: DragEvent) => {
    startDraggingEntry(); //Set the dragging state to true

    //Set the entry id to the dataTransfer object
    e.dataTransfer.setData('entry', entry._id);
  }

  const onDragEnd = (e: DragEvent) => {
    endDraggingEntry();
  }

  return (
    <Card 
      sx={{ marginBottom: 1 }}
      //Drag Events
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
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
          <Typography variant="body2">Hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
