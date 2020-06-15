import { all } from 'redux-saga/effects';
import SocketSaga from './sagaSocket';

/**
 * Redux Sagas sit between the Actions and Reducers listening for "messages"
 * las sagas se crean para manejar los side effects 
 * permite que las peticiones ocurran mas mas asincronamete
 * cuando se realizan llamas a alguna api o servidor
 */
export default function* rootSaga( params ) {
	console.log(' <---------  Sagas index --------->');
	yield all([
		SocketSaga( params )
	]);
}
