import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { getFileContents, fetchFolderDetails } from '../api';

// constants
export const OPEN_FILE = 'git-viwer/OPEN_FILE';
export const OPEN_FILE_SUCCESS = 'git-viewer/OPEN_FILE_SUCCESS';
export const OPEN_FILE_FAILURE = 'git-viewer/OPEN_FILE_FAILURE';
export const CLOSE_FILE = 'git-viwer/CLOSE_FILE';
export const OPEN_FOLDER = 'git-viwer/OPEN_FOLDER';
export const OPEN_FOLDER_SUCCESS = 'git-viwer/OPEN_FOLDER_SUCCESS';
export const OPEN_FOLDER_FAILURE = 'git-viwer/OPEN_FOLDER_FAILURE';

// const SHOW_SIDEBAR = 'git-viwer/SHOW_SIDEBAR';
// const HIDE_SIDEBAR = 'git-viwer/HIDE_SIDEBAR';

import { LOAD_REPO, LOAD_REPO_SUCCESS } from './home';

// initial state
const initialState = {
  childrenMap: {},
  files: [],
  root: {}
};

const addChildNodesToMap = (state, id, childNodes) => {
  return {...state, [id]: childNodes};
};

// reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_REPO:
      const { username, repoName } = action;
      return { ...state, username, repoName };

    case LOAD_REPO_SUCCESS:
      const { repo } = action;
      return {
        ...state,
        root: {
          id: repo.id, name: repo.name, type: 'dir'
        },
        childrenMap: addChildNodesToMap(state.childrenMap, repo.id, repo.childNodes),
        files: [] };
    case OPEN_FOLDER_SUCCESS:
      const { folder } = action;
      return {
        ...state, childrenMap: addChildNodesToMap(state.childrenMap, folder.id, folder.contents)
      };
    case OPEN_FILE_SUCCESS:
      const files = [...state.files, action.file];
      const selected = files.indexOf(action.file);
      return { ...state, files, selected };

    case CLOSE_FILE:
      const filteredFiles = state.files.filter((file) => {
        return file.path !== action.fileName;
      });
      return { ...state, files: filteredFiles, selected: filteredFiles.length - 1 };

    default:
      return state;
  }
}

export function openFolder(payload) {
  return {
    type: OPEN_FOLDER,
    payload
  };
}

export function* openFolderSaga(action) {
  try {
    const { url, id } = action.payload;
    const folderContents = yield call(fetchFolderDetails, url);

    if (folderContents) {
      yield put({ type: OPEN_FOLDER_SUCCESS, folder: { id: id, contents: folderContents } });
    } else {
      yield put({ type: OPEN_FOLDER_FAILURE, error: 'Something went wrong, please check the url again!' });
    }
  } catch (e) {
    yield put({ type: OPEN_FOLDER_FAILURE, error: 'Something went terribly wrong while opening file!' });
  }
}

// action creators
export function openFile (payload) {
  return {
    type: OPEN_FILE,
    payload
  };
}

export function closeFile (fileName) {
  return {
    type: CLOSE_FILE,
    fileName
  };
}

// sagas
export function* openFileSaga (action) {
  try {
    const { username, repoName, name, path, id } = action.payload;
    const fileContents = yield call(getFileContents, { username, repoName, path });

    if (fileContents) {
      yield put({ type: OPEN_FILE_SUCCESS, file: { title: name, path, id, contents: fileContents } });
    } else {
      yield put({ type: OPEN_FILE_FAILURE, error: 'Something went wrong, please check the url again!' });
    }
  } catch (e) {
    yield put({ type: OPEN_FILE_FAILURE, error: 'Something went terribly wrong while opening file!' });
  }
}

export function* watchOpenFolderSaga() {
  yield takeEvery(OPEN_FOLDER, openFolderSaga);
}

export function* watchOpenFileSaga () {
  yield takeEvery(OPEN_FILE, openFileSaga);
}
