import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { BoardPage } from './pages/BoardPage/BoardPage';
import { Page404 } from './pages/Page404/Page404';

import { Layout } from './components/Layout/Layout';
import { RequireAuth } from './hoc/RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
          <Route path=":boardId" element={<BoardPage />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
