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

// AsyncStorage get 함수 모듈r
export const getAllItemFromAsync = async (module: string) => {
    const data: { key: string, val: string }[] = [];
    if (isEmpty(module)) {
        throw Error('module is empty');
    }
    try {
        const keys = await AsyncStorage.getAllKeys();
        const moduleKeys = keys.filter(key => key.indexOf(module) > -1);
        const items = await AsyncStorage.multiGet(moduleKeys);
        items.forEach((item) => {
            data.push({ key: item[0], val: item[1] })
        })
    } catch (error) {
        console.log(error)
    }
    return data;
}