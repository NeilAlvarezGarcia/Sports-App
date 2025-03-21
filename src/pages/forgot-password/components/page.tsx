import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { Text } from '../../../components/Text';
import styled from 'styled-components';

export function Page() {
  // const { mode } = UseContext();
  // const navigate = useNavigate();
  // const [error, setError] = useState<string>('');
  // const [message, setMessage] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(false);
  // const [email, setEmail] = useState('');

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setError('');
  //   setEmail(e.target.value);
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!email) return setEmail('Email field cannot be empty.');

  //   setLoading(true);
  //   try {
  //     const { error } = await forgotPassword(email);

  //     if (error) throw new Error(error);

  //     setMessage('Check your email for further instructions');
  //     setEmail('');

  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 3000);
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   document.title = 'GreenRun Sports - Forget Password';
  // }, []);

  return (
    <Section>
      <Container>
        <Header>
          <Text fontSize={42} fontWeight={700} textAlign='center'>
            Forgot Password
          </Text>

          <Text color='secondary' textAlign='center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Header>

        {/* {error && <Error>{error}</Error>} */}
        <Content>
          <TextInput name='email' label='User' required />

          <Text>
            Have already an account?{' '}
            <Button variant='text' to='/login'>
              Login
            </Button>
          </Text>

          <Button>Recover</Button>
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
