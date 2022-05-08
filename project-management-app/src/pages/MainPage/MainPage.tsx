import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { BASE_URL } from '../../constants/constants';
import { IBoard } from '../../reducers/boardsReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createBoard, deleteBoard, getBoards, updateBoard } from '../../thunks/boards';
import './main-page.css';

export function MainPage() {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((store) => store.boards);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  // useEffect(() => {
  //   registerUser();
  // }, []);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  function makeBoards(boards: Array<IBoard>) {
    return boards.map((board: IBoard) => {
      return (
        <div className="board" key={board.id}>
          <div className="board__view">{board.title}</div>
          <div className="board__buttns">
            <span className="icon-button">
              <img src="./../assets/jpg/pencil.png" alt="icon-file" />
            </span>
            <span className="icon-button">
              <img
                src="./../assets/jpg/trash.png"
                alt="icon-file"
                onClick={() => dispatch(deleteBoard(board.id))}
              />
            </span>
          </div>
        </div>
      );
    });
  }

  function addNewBoard() {
    const board = {
      title: value,
    };
    dispatch(createBoard(board));
    setVisible(false);
    setValue('');
  }

  return (
    <div>
      <Header />
      {visible ? (
        <p>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)}></input>
          <button onClick={() => addNewBoard()}>Set</button>
        </p>
      ) : (
        ''
      )}
      <div className="main">
        <div className="main__header">
          <span className="main__title">Good day, Diana!</span>
          <button className="main__btn" onClick={() => setVisible(true)}>
            Create board
          </button>
        </div>
        <div className="main__cont">{makeBoards(boards) || 'none'}</div>
      </div>
    </div>
  );
}

// const registerUser = async () => {
//   const response = await fetch(`${BASE_URL}/signin`, {
//     method: 'POST',
//     body: JSON.stringify({
//       login: 'diana',
//       password: 'qwerty',
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
//   console.log(data);
//   return data;
// };
