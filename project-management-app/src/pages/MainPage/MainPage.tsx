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
  const [visibleU, setVisibleU] = useState(false);
  const [inputValue, setinputValue] = useState('');
  const [changingBoardId, setChangingBoardId] = useState('');
  // useEffect(() => {
  //   registerUser();
  // }, []);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  useEffect(() => {
    console.log(boards);
  }, [boards]);

  function makeBoards(boards: Array<IBoard>) {
    return boards.map((board: IBoard) => {
      return (
        <div className="board" key={board.id}>
          <div className="board__view">{board.title}</div>
          <div className="board__buttns">
            <span className="icon-button">
              <img
                src="./../assets/jpg/pencil.png"
                alt="icon-file"
                onClick={() => openUpdateBoard(board)}
              />
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
      title: inputValue,
    };
    dispatch(createBoard(board));
    setVisible(false);
    setinputValue('');
  }

  function openUpdateBoard(board: IBoard) {
    setVisibleU(true);
    setChangingBoardId(board.id);
    setinputValue(board.title);
  }
  function changeBoard() {
    const board = {
      title: inputValue,
      id: changingBoardId,
    };
    dispatch(updateBoard(board));
    setinputValue('');
    setVisibleU(false);
  }

  return (
    <div>
      <Header />
      {visible ? (
        <p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          ></input>
          <button onClick={() => addNewBoard()}>Set</button>
          <button onClick={() => setVisible(false)}>Back</button>
        </p>
      ) : (
        ''
      )}
      {visibleU ? (
        <p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          ></input>
          <button onClick={() => changeBoard()}>Set</button>
          <button onClick={() => setVisibleU(false)}>Back</button>
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
        <div className="main__cont">{makeBoards(boards)}</div>
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
