import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { registerUser } from '@/lib/authenticate';
import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data) {
    const success = await registerUser(data.userName, data.password, data.password2);
    if (success) {
      router.push('/login');
    } else {
      setError(true);
    }
  }

  return (
    <Container className="my-4" style={{ maxWidth: '500px' }}>
      <h2>Register</h2>
      {error && <Alert variant="danger">Registration failed. Try again.</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" {...register('userName', { required: true })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...register('password', { required: true })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" {...register('password2', { required: true })} />
        </Form.Group>

        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
}
