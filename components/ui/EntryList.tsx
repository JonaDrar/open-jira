import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDraggingEntry, endDraggingEntry } = useContext(UIContext);

  const filteredEntries = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const entryId = e.dataTransfer.getData('entry');
    const entry = entries.find((entry) => entry._id === entryId)!;
    entry.status = status;
    updateEntry(entry);
    endDraggingEntry();
  };

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={ isDraggingEntry ? styles.dragging : ''}>
      <Paper
        sx={{
          height: 'calc(100vh - 215px)',
          overflowY: 'scroll',
          backgroundColor: 'transparent',
          padding: 1,
        }}
      >
        <List
          sx={{ opacity: isDraggingEntry ? 0.2 : 1, transition: 'all .3s' }}
        >
          {filteredEntries.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
