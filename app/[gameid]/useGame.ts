import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../db';

export interface IGame {
  id: string;
  name: string;
  timestamp: number;
}

export default function useGame(gameID: string): null | IGame {
  const [game, setGame] = useState<null | IGame>(null);

  useEffect(() => {
    const gameRef = ref(db, `games/${gameID}`);
    const removeOnValue = onValue(gameRef, (snapshot) => {
      if (snapshot.key == null) {
        throw new Error('null snapshot key');
      }
      setGame({
        id: snapshot.key,
        name: snapshot.val().name,
        timestamp: snapshot.val().timestamp,
      });
    });
    return removeOnValue;
  }, [gameID]);

  return game;
}
