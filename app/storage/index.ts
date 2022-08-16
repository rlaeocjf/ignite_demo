import AsyncStorage from "@react-native-community/async-storage"

const isEmpty = function (value: any) {
    if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};

// AsyncStorage get 함수 모듈
export const getItemFromAsync = (storageName: string) => {
    if (isEmpty(storageName)) {
        throw Error('Storage Name is empty');
    }
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(storageName, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result === null) {
                resolve(null);
            }
            resolve(JSON.parse(result));
        });
    });
};

// AsyncStorage set 함수 모듈
export const setItemToAsync = (storageName: string, item: any) => {
    if (isEmpty(storageName)) {
        throw Error('Storage Name is empty');
    }
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(storageName, JSON.stringify(item), (error) => {
            if (error) {
                reject(error);
            }
            resolve('async succese');
        });
    });
};

// AsyncStorage get 함수 모듈
export const getAllItemFromAsync = async (module: string) => {
    if (isEmpty(module)) {
        throw Error('module is empty');
    }
    try {
        const keys = await AsyncStorage.getAllKeys();
        console.log(keys)
        const moduleKeys = keys.filter(key => key.indexOf(module) > -1)
        const contents = await AsyncStorage.multiGet(moduleKeys);
        // do something what you need with response
        // console.log('11111111111111111111111111111111');
        // console.log(contents);
        // console.log('22222222222222222222222222222222222');
    } catch (error) {
        console.log(error)
    }
}