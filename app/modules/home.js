import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getRepoDetails } from '../api';

// constants
export const LOAD_REPO = 'git-viewer/LOAD_REPO';
export const LOAD_REPO_SUCCESS = 'git-viewer/LOAD_REPO_SUCCESS';
export const LOAD_REPO_FAILURE = 'git-viewer/LOAD_REPO_FAILURE';

// initial state
const initialState = {
  error: '',
  isLoading: false
};

// reducer
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

// action creators
function extractRepoDetails (url) {
  const strippedUrl = url.replace('https://github.com/', '');
  const [ username, repoName ] = strippedUrl.split('/');
  return { username, repoName };
}

export function loadRepo (url) {
  const { username, repoName } = extractRepoDetails(url);
  return {
    type: LOAD_REPO,
    username,
    repoName
  };
}

// sagas
export function* loadRepoSaga(action) {
  try {
    const folderContents = yield call(getRepoDetails, { username: action.username, repoName: action.repoName });

    if (folderContents) {
      yield put(push('/viewer'));
      yield put({ type: LOAD_REPO_SUCCESS, repo: { name: action.repoName, id: action.repoName, childNodes: folderContents }});
    } else {
      yield put({ type: LOAD_REPO_FAILURE, error: 'Something went wrong, please check the url again!' });
    }
  } catch(e) {
    yield put({ type: LOAD_REPO_FAILURE, error: 'Something went terribly wrong while loading repo!' });
  }
}

export function* watchLoadRepoSaga() {
  yield takeEvery(LOAD_REPO, loadRepoSaga);
}
