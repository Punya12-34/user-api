import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';
import { Card, ListGroup } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    } else {
      async function loadFavourites() {
        const data = await getFavourites();
        setFavouritesList(data);
      }
      loadFavourites();
    }
  }, [router, setFavouritesList]);

  // ✅ Wait for data before rendering
  if (favouritesList === undefined) return null;

  return (
    <>
      <h2 className="my-4">Your Favourites</h2>
      {favouritesList.length === 0 ? (
        <Card className="text-center p-3">
          <Card.Body>No favourites found.</Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {favouritesList.map((fav, i) => (
            <ListGroup.Item key={i}>{fav}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
