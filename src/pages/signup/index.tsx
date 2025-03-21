import { FormProvider } from './providers/form-provider';
import { Page } from './components/page';

const Signup = () => {
  return (
    <FormProvider>
      <Page />
    </FormProvider>
  );
};

export default Signup;
