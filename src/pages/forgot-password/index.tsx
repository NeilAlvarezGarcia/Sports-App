import { FormProvider } from './providers/form-provider';
import { Page } from './components/page';

const ForgotPassword = () => {
  return (
    <FormProvider>
      <Page />
    </FormProvider>
  );
};

export default ForgotPassword;
