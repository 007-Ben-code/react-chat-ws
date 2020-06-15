import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// store all the data for the App
import configureStore from './redux/store/store';

// sockets es un side effect que se controlara por medio de saga
// import setupSocket from './redux/sockets/socket'

// Sagas para el manejo de los side effects o peticiones a servidores
import rootSaga from './redux/sagas/rootSagas';
/**
 * Se crea un usuario generico para iniciar el chat
 */
import username from './redux/utils/name';

/**
 * Encapsular nuestra aplicación con el componente Provider 
 * Se crea el store de toda la aplicacion
 * Provider: Define el contexto global de React nuestra instancia del store.
 */
const store = configureStore( );

/**
 * por medio de la configuracion de la store y las sagas redux
 * se envian las acciones a los reducers
 * para tener un control de las peticiones se usan redux-saga
 * ejecuta el middleware para los side effects
 */
 store.runSaga.run(rootSaga, {dispatch: store.dispatch, username, room: 'room-1'})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
