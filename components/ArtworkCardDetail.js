import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // ✅ Sync state with atom
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  // ✅ Handle favourites add/remove via API
  async function favouritesClicked() {
    let updatedList;
    if (showAdded) {
      updatedList = await removeFromFavourites(objectID);
    } else {
      updatedList = await addToFavourites(objectID);
    }
    setFavouritesList(updatedList);
    setShowAdded(!showAdded);
  }

  if (error) return <Error statusCode={404} />;

  if (data) {
    return (
      <Card>
        {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
        <Card.Body>
          <Card.Title>{data.title || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>{data.objectDate || "N/A"}<br />
            <strong>Classification: </strong>{data.classification || "N/A"}<br />
            <strong>Medium: </strong>{data.medium || "N/A"}<br /><br />
            <strong>Artist: </strong> {data.artistDisplayName || "N/A"} 
            {data.artistWikidata_URL && (
              <> (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>) </>
            )}<br />
            <strong>Credit Line: </strong> {data.creditLine || "N/A"}<br />
            <strong>Dimensions: </strong> {data.dimensions || "N/A"}
          </Card.Text>

          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}
