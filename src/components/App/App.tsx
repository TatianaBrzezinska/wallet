import { Accounts, History } from '../index';
import { Context } from '../../store/context';
import { useAppStore } from '../../store/actions';
import './App.css';

export const App = () => {
  const store = useAppStore();
  return (
    <Context.Provider value={store}>
      <section className="app">
        <div className="container">
          <div className="app__grid">
            <Accounts />
            <History />
          </div>
        </div>
      </section>
    </Context.Provider>
  );
};
