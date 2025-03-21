import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { Text } from '../../../components/Text';
import styled from 'styled-components';

export function Page() {
  return (
    <Section>
      <Container>
        <Header>
          <Text fontSize={42} fontWeight={700} textAlign='center'>
            Welcome
          </Text>

          <Text color='secondary' textAlign='center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Header>

        {/* {error && <Error>{error}</Error>} */}
        <Content>
          <Inputs>
            <TextInput name='email' label='User' required />
            <TextInput name='password' type='password' label='Password' required />
          </Inputs>

          <Button to='/forgot-password' variant='text'>
            Forgot Password?
          </Button>

          <Text>
            Don't have an account?{' '}
            <Button variant='text' to='/sign-up'>
              Sign up
            </Button>
          </Text>

          <Button>Login</Button>
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
