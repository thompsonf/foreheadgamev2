import { useEffect, useState } from 'react';
import { onValue, orderByChild, query, ref } from 'firebase/database';
import { IGame } from './[gameid]/useGame';
import { db } from './db';

export default function useGameList(): null | ReadonlyArray<IGame> {
  const [gameList, setGameList] = useState<null | ReadonlyArray<IGame>>(null);

  useEffect(() => {
    const gameRef = query(ref(db, `games`), orderByChild('timestamp'));
    const removeOnValue = onValue(gameRef, (snapshot) => {
      const gameList: Array<IGame> = [];
      snapshot.forEach((snap: any) => {
        gameList.push({ id: snap.key, ...snap.val() });
      });
      gameList.reverse();
      setGameList(gameList);
    });
    return removeOnValue;
  }, []);

  return gameList;
}
