import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { emptyMethod } from './costants';

/**
 * 本地存储
 */
const mStorage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
});
export default mStorage;

export const saveNavRecord = (data: any, finishCall: any): void => {
  loadNavRecord()
    .then(res => {
      let length = res.length;
      let canSave = true;
      for (let i = 0; i < length; i++) {
        if (res[i].endPoint.point.longitude === data.endPoint.point.longitude) {
          canSave = false;
        }
      }
      canSave &&
        mStorage
          .save({ key: 'navRecord', data: JSON.stringify([...res, data]) })
          .then(finishCall)
          .catch(emptyMethod);
    })
    .catch(() => {
      mStorage
        .save({ key: 'navRecord', data: JSON.stringify([data]) })
        .then(finishCall)
        .catch(emptyMethod);
    });
};

export const loadNavRecord = async () => {
  const data = await mStorage.load({ key: 'navRecord' });
  return JSON.parse(data);
};
