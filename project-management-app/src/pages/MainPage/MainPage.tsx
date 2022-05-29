import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { Spinner } from '../../components/Spinner/Spinner';
import { getTimeOfDay } from '../../helpers/helpers';
import { IBoard } from '../../reducers/boardsReducer';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  IInfo,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createBoard, getBoards } from '../../thunks/boards';
import { Board } from './Board';
import { TOKEN } from '../../constants/constants';
import jwt_decode from 'jwt-decode';
import { IUserFromToken } from '../UpdateUserPage/UpdateUserPage';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { getAllTask } from '../../thunks/task';
import './main-page.css';

export type IOpenModalFunction = (
  modalName: string,
  modalTitle: string,
  confirmFunction: (info: IInfo) => void,
  modalButtonTxt: string,
  info: IBoard | null
) => void;

export function MainPage() {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((store) => store.boards);
  const token = TOKEN() as string;
  let userName = 'user';
  if (token) {
    const decodedToken: IUserFromToken = jwt_decode(token);
    userName = decodedToken.login;
  }
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getBoards());
    dispatch(getAllTask());
  }, []);

  function makeBoards(boards: Array<IBoard>) {
    return boards.map((board: IBoard) => (
      <Board board={board} openModal={openModal} key={board.id} />
    ));
  }

  function openModal(
    modalName: string,
    modalTitle: string,
    confirmFunction: (info: IInfo) => void,
    modalButtonTxt = 'Ok',
    info: IBoard | null = null
  ) {
    dispatch(changeModalName(modalName));
    dispatch(changeModalTitle(modalTitle));
    dispatch(changeModalText(modalButtonTxt));
    dispatch(changeModalFunction(confirmFunction));
    dispatch(toggleActive());
    if (info) dispatch(setModalInfo(info));
  }

  function createNewBoard({ title, description }: IInfo) {
    const board = {
      title: title || '',
      description: description || 'No description',
    };
    dispatch(createBoard(board));
  }

  return (
    <div>
      <div className="main">
        <div className="main__header">
          <div className="main__header-inner">
            <span className="main__title">
              {t(`mainPage.${getTimeOfDay(new Date().getHours())}`)}
              {`, ${userName}` || 'user'}!
            </span>
            <Button
              className="main__btn"
              onClick={() =>
                openModal(
                  'FormModal',
                  t('mainPage.Create a board'),
                  createNewBoard,
                  t('mainPage.Create')
                )
              }
            >
              {t('mainPage.Create board')}
            </Button>
          </div>
        </div>
        <SearchBar />
        <div className="main__cont">
          {isLoading ? (
            <Spinner />
          ) : makeBoards(boards).length ? (
            makeBoards(boards)
          ) : (
            <p>
              {t('mainPage.No boards yet,')}
              <span
                onClick={() =>
                  openModal(
                    'FormModal',
                    t('mainPage.Create a board'),
                    createNewBoard,
                    t('mainPage.Create')
                  )
                }
              >
                {t('mainPage.create a new one')}
              </span>
              ?
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
