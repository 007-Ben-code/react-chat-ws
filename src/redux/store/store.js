import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

// Reducers envian la data al store
import rootReducer from '../reducers/rootReducers';
// Sagas para escuchar las peticiones
import rootSagas from '../sagas/rootSagas';

const configureStore = ( ) => {
    console.log('<--- Store --->');
    // create the redux-saga middleware
    const sagaMiddleware = createSagaMiddleware(rootSagas);

	return {
		...createStore(
            rootReducer,
            // el middleware es necesario incializarse en la creacion del store
            applyMiddleware(sagaMiddleware)
        ),
        
        // el rootsagas comienza a escuchar a los watchers y envia parametros
        // runSaga: sagaMiddleware.run(rootSagas, {socket:'', name:''})
        runSaga: sagaMiddleware
    };
    
};

export default configureStore; 