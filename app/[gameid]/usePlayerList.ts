'use client';

import { useEffect, useState } from 'react';
import { onValue, orderByChild, query, ref } from 'firebase/database';
import { db } from '../db';

interface IPlayer {
  forehead: string;
  id: string;
  name: string;
  timeCreated: number;
  timeFinished: null | number;
}

export default function usePlayerList(gameID: string): ReadonlyArray<IPlayer> | null {
  const [playerList, setPlayerList] = useState<ReadonlyArray<IPlayer> | null>(null);

  useEffect(() => {
    const playersRef = query(ref(db, `games/${gameID}/players`), orderByChild('timeCreated'));
    const removeOnValue = onValue(playersRef, (snapshot) => {
      const playerList: Array<IPlayer> = [];
      snapshot.forEach((snap: any) => {
        playerList.push({ id: snap.key, ...snap.val() });
      });
      setPlayerList(playerList);
    });
    return removeOnValue;
  }, [gameID]);
  return playerList;
}
