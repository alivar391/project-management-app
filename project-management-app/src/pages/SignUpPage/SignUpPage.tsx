import { useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { registerUser } from '../../thunks/user';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import InputFile from '../../components/InputFile/InputFile';
import 'react-toastify/dist/ReactToastify.css';
import './signUpPage.css';

export type IForm = {
  name: string;
  login: string;
  password: string;
  confirm: string;
  email: string;
  avatar: FileList;
};
export type IUser = {
  name: string;
  login: string;
  password: string;
};

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>({
    mode: 'onChange',
  });

  const password = useRef('');
  password.current = watch('password');

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const newUser = {
      name: data.name,
      login: data.login,
      password: data.password,
    };
    dispatch(registerUser(newUser));
    navigate('/signin', { replace: true });
  };

  return (
    <div className="container-form">
      <div className="container-img-register"></div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create account</h2>
        <div className="namesUser">
          <Input
            register={register('login', {
              required: 'Requered',
              minLength: { value: 3, message: 'Too short name' },
            })}
            nameInput={'login'}
            textLabel={'Login'}
            datatestId={'input-login'}
            type={'text'}
            errors={errors}
          />
          <Input
            register={register('name', {
              required: 'Requered',
              minLength: { value: 3, message: 'Too short name' },
            })}
            nameInput={'name'}
            textLabel={'Name'}
            datatestId={'input-name'}
            type={'text'}
            errors={errors}
          />
        </div>
        <Input
          register={register('password', {
            required: 'Requered',
            pattern: {
              value: /^(?=.{8,}$)(?=(?:.*?[A-Z]){2})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$/,
              message: 'Must be contain 2numbers, 2lowercase, 2uppercase letters, min 8',
            },
          })}
          nameInput={'password'}
          textLabel={'Password'}
          datatestId={'input-password'}
          type="password"
          errors={errors}
          autoComplete="off"
        />
        <Input
          register={register('confirm', {
            required: 'Requered',
            validate: (value) => value === password.current,
          })}
          nameInput={'confirm'}
          textLabel={'Confirm Password'}
          datatestId={'input-confirm'}
          type="password"
          errors={errors}
          autoComplete="off"
        />
        <Input
          register={register('email', {
            required: 'Requered',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          nameInput={'email'}
          textLabel={'Email'}
          datatestId={'input-email'}
          type="email"
          errors={errors}
          autoComplete="off"
        ></Input>
        <InputFile register={register('avatar')} />
        <div className="redirect">
          Already have an account?{' '}
          <Link to="/signin" className="redirect-link">
            Log In
          </Link>
        </div>
        <button
          data-testid="button-submit-form"
          className="form__btn-submit"
          onSubmit={handleSubmit(onSubmit)}
        >
          Register
        </button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};
