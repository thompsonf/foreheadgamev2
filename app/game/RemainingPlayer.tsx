import { useState } from 'react';
import { ref, remove, update } from 'firebase/database';
import { Button, Group, Modal } from '@mantine/core';
import { db } from '../db';
import Player from './Player';
import { IRemainingPlayer } from './usePlayerLists';

export default function RemainingPlayer({
  gameID,
  isLocked,
  player,
}: {
  gameID: string;
  isLocked: boolean;
  player: IRemainingPlayer;
}) {
  const [isShown, setIsShown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinishing, setIsFinished] = useState(false);

  return (
    <>
      <Player
        content={
          !isLocked ? (
            <Group gap="sm">
              <Button onClick={() => setIsShown(!isShown)} size="compact-md">
                {isShown ? 'Hide' : 'Show'}
              </Button>
              <Button color="violet" onClick={() => setIsFinished(true)} size="compact-md">
                Done
              </Button>
              <Button color="red" onClick={() => setIsDeleting(true)} size="compact-md">
                Delete
              </Button>
            </Group>
          ) : null
        }
        isShown={isShown}
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
        onClose={() => setIsFinished(false)}
        opened={isFinishing}
        title="Confirm Done"
      >
        Are you sure <strong>{player.name}</strong> is done?
        <Group mt="lg" justify="flex-end">
          <Button onClick={() => setIsFinished(false)}>Cancel</Button>
          <Button
            onClick={() => {
              update(ref(db, `games/${gameID}/players/${player.id}`), { timeFinished: Date.now() });
              setIsFinished(false);
            }}
            color="violet"
          >
            Done
          </Button>
        </Group>
      </Modal>
    </>
  );
}
