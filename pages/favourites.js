import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <>
      <h2>Favourites</h2>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map(objectID => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>
              <h4>Nothing Here</h4>
              Try adding some new artwork to the list.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
