import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { authenticateUser, isAuthenticated } from '@/lib/authenticate';
import { useEffect, useState } from 'react';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { Form, Button, Alert, Container } from 'react-bootstrap';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    if (isAuthenticated()) router.push('/favourites');
  }, []);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function onSubmit(data) {
    const success = await authenticateUser(data.userName, data.password);
    if (success) {
      await updateAtoms(); // ✅ Load data from API
      router.push('/favourites');
    } else {
      setError(true);
    }
  }

  return (
    <Container className="my-4" style={{ maxWidth: "500px" }}>
      <h2>Login</h2>
      {error && <Alert variant="danger">Login failed. Check your credentials.</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control {...register("userName", { required: true })} type="text" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password", { required: true })} type="password" />
        </Form.Group>

        <Button variant="primary" type="submit">Log In</Button>
      </Form>
    </Container>
  );
}
