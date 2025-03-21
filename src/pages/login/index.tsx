import { FormProvider } from './providers/form-provider';
import { Page } from './components/page';

const Login = () => {
  // const navigate = useNavigate();
  // const [error, setError] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(false);
  // const [formState, setFormState] = useState({
  //   email: '',
  //   password: '',
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setError('');

  //   setFormState((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!formState.email || !formState.password) return setError('No field can be empty.');

  //   setLoading(true);
  //   const res = await login(formState.email, formState.password);

  //   setLoading(false);
  //   if (res) return setError(res.error);

  //   navigate('/home');
  // };

  // useEffect(() => {
  //   return onAuthStateChanged(auth, (user) => {
  //     if (user) navigate('/home');
  //   });
  // }, [navigate]);

  return (
    <FormProvider>
      <Page />
    </FormProvider>
  );
};

export default Login;
