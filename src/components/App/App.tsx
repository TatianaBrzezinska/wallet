import { Accounts, History } from '../index';
import './App.css';

export const App = () => {
  return (
    <section className="app">
      <div className="container">
        <div className="app__grid">
          <Accounts />
          <History />
        </div>
      </div>
    </section>
  );
};
