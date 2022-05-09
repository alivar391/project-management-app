import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks';
import { authUser } from '../../thunks/user';
import { setUserInfo } from '../../reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import './../SignUpPage/signUpPage.css';
import './signinPage.css';
import 'react-toastify/dist/ReactToastify.css';

export type IUser = {
  login: string;
  password: string;
};

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUser>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IUser> = (data) => {
    const login = {
      login: data.login,
      password: data.password,
    };
    dispatch(authUser(login));
    dispatch(setUserInfo(login));
    //navigate('/', { replace: true });
  };

  return (
    <div className="container-form">
      <div className="container-img-autorisation"></div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
        <Input
          register={register('login')}
          nameInput={'login'}
          textLabel={'Login'}
          datatestId={'input-login'}
          type={'text'}
        />
        <Input
          register={register('password')}
          nameInput={'password'}
          textLabel={'Password'}
          datatestId={'input-password'}
          type="password"
          autoComplete="off"
        />
        <div className="redirect">
          New User?{' '}
          <Link to="/signup" className="redirect-link">
            Sign Up
          </Link>
        </div>
        <button
          data-testid="button-submit-form"
          className="form__btn-submit"
          onSubmit={handleSubmit(onSubmit)}
        >
          Log In
        </button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};
