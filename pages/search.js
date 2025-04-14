import { Col, Row, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

export default function AdvancedSearch() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      searchBy: "title"
    }
  });

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function submitForm(data) {
    let queryString = `${data.searchBy}=true`;

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation.trim()}`;
    if (data.medium) queryString += `&medium=${data.medium.trim()}`;
    queryString += `&isOnView=${data.isOnView ? true : false}`;
    queryString += `&isHighlight=${data.isHighlight ? true : false}`;
    queryString += `&q=${data.q.trim()}`;

    setSearchHistory(current => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              className={errors.q ? "is-invalid" : ""}
              {...register("q", { required: true })}
            />
            {errors.q && <div className="invalid-feedback">Search query is required.</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" placeholder="" {...register("geoLocation")} />
            <Form.Text className="text-muted">
  {"Case Sensitive String (e.g., \"Europe\", \"France\", \"Paris\", \"China\", \"New York\"), multiple values separated by |"}
</Form.Text>

          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" placeholder="" {...register("medium")} />
            <Form.Text className="text-muted">
  {"Case Sensitive String (e.g., \"Ceramics\", \"Furniture\", \"Paintings\", \"Sculpture\", \"Textiles\"), multiple values separated by |"}
</Form.Text>

          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
            <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
