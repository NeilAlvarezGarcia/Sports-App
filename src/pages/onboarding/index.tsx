import styled from 'styled-components';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';

function Onboarding() {
  // useEffect(() => {
  //   return onAuthStateChanged(auth, (user) => {
  //     if (user) navigate('/home');
  //   });
  // }, [navigate]);

  return (
    <Section>
      <Container>
        <TextContainer>
          <Text fontSize={28} fontWeight={700}>
            Discover Your Best Sport With Us
          </Text>

          <Text color='secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </TextContainer>

        <Button to='/login'>Login</Button>
      </Container>
    </Section>
  );
}

const Section = styled('section')`
  display: flex;
  align-items: flex-end;
  height: 100%;
  background-image: url('/mess.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0;

  @media (min-width: 768px) {
    justify-content: flex-end;
    align-items: unset;
  }
`;

const Container = styled('div')`
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 36px 36px 0px 0px;
  max-height: 348px;
  height: 100%;
  padding: 64px 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  flex: 1;

  @media (min-width: 768px) {
    max-width: 50%;
    max-height: unset;
    border-radius: 36px 0px 0px 36px;
  }
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 252px;
`;

export default Onboarding;
