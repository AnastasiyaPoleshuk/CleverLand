import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { AppState } from './context/AppContext';
import { store } from './store/store';
import { App } from './App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <AppState>
            <HashRouter>
                <App />
            </HashRouter>
        </AppState>
    </Provider>
);
