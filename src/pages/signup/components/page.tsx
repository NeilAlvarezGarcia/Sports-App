import styled from 'styled-components';
import { Text } from '../../../components/Text';
import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { useForm } from '../../../components/form';

export function Page() {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const regexPassword = /^.{8,20}$/;

  //   if (!regexPassword.test(formState.passwordConfirmation)) {
  //     return setError('Length of the password wrong');
  //   } else if (formState.password !== formState.passwordConfirmation)
  //     return setError('The passwords must match each other.');

  //   setLoading(true);
  //   try {
  //     const res = await signUp(formState.email, formState.passwordConfirmation);
  //     if (res) throw new Error(res);

  //     navigate('/home');
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  //   setLoading(false);
  // };
  const { loading } = useForm();
  return (
    <Section>
      <Container>
        <Header>
          <Text fontSize={42} fontWeight={700} textAlign='center'>
            Sign Up
          </Text>

          <Text color='secondary' textAlign='center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Header>

        {/* {error && <ErrorComponent>{error}</ErrorComponent>} */}
        <Content>
          <Inputs>
            <TextInput name='email' label='User' />
            <TextInput name='password' type='password' label='Password' />
            <TextInput name='confirmPassword' type='password' label='Verify Password' />
          </Inputs>

          <Text>
            Have already an account?{' '}
            <Button variant='text' to='/login'>
              Login
            </Button>
          </Text>

          <Button type='submit' loading={loading}>
            Sign up
          </Button>
        </Content>
      </Container>
    </Section>
  );
}

const Section = styled('section')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled('div')`
  padding: 0px 32px;
`;

const Header = styled('header')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

const Content = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Inputs = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
