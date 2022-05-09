import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import jwt_decode from 'jwt-decode';
import { deleteUser, updateUser } from '../../thunks/user';
import './updateUserPage.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

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

export type IUserFromToken = {
  iat: number;
  login: string;
  userId: string;
};

export const UpdateUserPage = () => {
  const tokenUser = useAppSelector((state) => state.userInfo.token.token);
  console.log('токен', tokenUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const newUser = {
      name: data.name,
      login: data.login,
      password: data.password,
    };
    const token = tokenUser as string;
    if (token) {
      const decodedToken: IUserFromToken = jwt_decode(token as string);
      const userId = decodedToken.userId;
      dispatch(updateUser({ userId, newUser, token }));
    } else {
      toast.error('Error, please try again later');
    }
  };

  const onDelete = () => {
    const token = tokenUser as string;
    if (token) {
      const decodedToken: IUserFromToken = jwt_decode(token as string);
      const userId = decodedToken.userId;
      dispatch(deleteUser({ userId, token }));
    } else {
      toast.error('Invalid token, login and try again');
    }
  };

  return (
    <div className="container-form form-update">
      <div className="container-img-update"></div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Update User Info</h2>
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
        <div className="buttons-form-update">
          <div className="form__btn-delete" onClick={onDelete}>
            Delete User
          </div>
          <button
            data-testid="button-submit-form"
            className="form__btn-submit"
            onSubmit={handleSubmit(onSubmit)}
          >
            Update info
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};
