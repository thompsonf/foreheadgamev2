import { onValue, ref } from 'firebase/database';
import { db } from '../db';

export default async function Page({ params }: { params: Promise<{ gameid: string }> }) {
  const gameid = (await params).gameid;
  const playersRef = ref(db, `games/${gameid}/players`);
  onValue(playersRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
  return <div>My Post: {gameid}</div>;
}
