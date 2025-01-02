import { useState } from 'react';
import { ref, remove, update } from 'firebase/database';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { db } from '../db';
import Player from './Player';
import { IFinishedPlayer } from './usePlayerLists';

export default function FinishedPlayer({
  gameID,
  isLocked,
  player,
}: {
  gameID: string;
  isLocked: boolean;
  player: IFinishedPlayer;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUndoing, setIsUndoing] = useState(false);

  return (
    <>
      <Player
        content={
          <Stack>
            <Text>Finished {new Date(player.timeFinished).toLocaleTimeString()}</Text>
            {!isLocked ? (
              <Group gap="sm">
                <Button color="violet" onClick={() => setIsUndoing(true)} size="compact-md">
                  Undo
                </Button>
                <Button color="red" onClick={() => setIsDeleting(true)} size="compact-md">
                  Delete
                </Button>
              </Group>
            ) : null}
          </Stack>
        }
        isShown={true}
        player={player}
      />
      <Modal
        centered={true}
        onClose={() => setIsDeleting(false)}
        opened={isDeleting}
        title="Confirm Deletion"
      >
        Are you sure you want to delete <strong>{player.name}</strong>?
        <Group mt="lg" justify="flex-end">
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          <Button
            onClick={() => {
              remove(ref(db, `games/${gameID}/players/${player.id}`));
              setIsDeleting(false);
            }}
            color="red"
          >
            Delete
          </Button>
        </Group>
      </Modal>
      <Modal
        centered={true}
        onClose={() => setIsUndoing(false)}
        opened={isUndoing}
        title="Confirm Undo"
      >
        Move <strong>{player.name}</strong> back to the <strong>Remaining</strong> section?
        <Group mt="lg" justify="flex-end">
          <Button onClick={() => setIsUndoing(false)}>Cancel</Button>
          <Button
            onClick={() => {
              update(ref(db, `games/${gameID}/players/${player.id}`), { timeFinished: null });
              setIsUndoing(false);
            }}
            color="violet"
          >
            Undo
          </Button>
        </Group>
      </Modal>
    </>
  );
}
