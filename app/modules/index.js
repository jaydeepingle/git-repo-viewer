import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import home, { watchLoadRepoSaga } from './home';
import repo, { watchOpenFileSaga, watchOpenFolderSaga } from './sidebar';
import commandPalette from './commandPalette';


const rootReducer = combineReducers({
  home,
  commandPalette,
  repo,
  routing
});

export default rootReducer;

export function* rootSaga () {
  yield [
    watchLoadRepoSaga(),
    watchOpenFileSaga(),
    watchOpenFolderSaga()
  ];
}
