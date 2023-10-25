import { Accounts } from '../../../features/accounts/components/Accounts/Accounts';
import { History } from '../../../features/transactions/components/History/History';

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
