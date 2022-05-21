import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

const getDB = async () => {
    return openDatabase({ name: 'tie.db', location: 'default' });
}

export const getTable = async () => {
    try {
        const query = "SELECT * FROM sqlite_master where name NOT IN('android_metadata', 'sqlite_sequence')";
        const results = await (await getDB()).executeSql(query);
        return results[0].rows;
    } catch (error) {
        throw error;
    }
}

export const createTable = async (tableName) => {
    const query = `
        CREATE TABLE IF NOT EXISTS '${tableName}' (
            id INTEGER PRIMARY KEY, 
            amount INT(10) NOT NULL, 
            type VARCHAR(10) NOT NULL,
            category VARCHAR(30) NOT NULL, 
            remark VARCHAR(255)
        )`;
    (await getDB()).executeSql(query);
};

export const getByDate = async (tableName, type, date) => {
    const nextDate = new Date(date + (1000 * 60 * 60 * 24)).getTime();
    const query = `SELECT * FROM '${tableName}' where id >= ${date} and id < ${nextDate} and type='${type}' order by id desc`;
    const results = await (await getDB()).executeSql(query);
    const result = results[0].rows;
    let data = []
    for (let i = 0; i < result.length; i++) {
        data.push(result.item(i))
    }
    return data;
};

export const getOne = async (tableName, date) => {
    const query = `SELECT * FROM '${tableName}' where id = ${date}`;
    const results = await (await getDB()).executeSql(query);
    return results[0].rows.item(0);
};

export const getAmount = async (tableName, type, date, next = 1) => {
    let query = `SELECT amount FROM '${tableName}' where type='${type}'`;
    if (date !== undefined) {
        const startDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth()).getTime();
        const endDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth() + next).getTime();
        query = `SELECT * FROM '${tableName}' where id >= ${startDate} and id < ${endDate} and type='${type}'`;
    }
    const results = await (await getDB()).executeSql(query);
    const result = results[0].rows;
    let data = 0
    for (let i = 0; i < result.length; i++) {
        data += result.item(i).amount
    }
    return data;
};

export const addEntry = async (tableName, data) => {
    const query = `INSERT INTO '${tableName}' values ( ${data.id}, '${data.amount}', '${data.type}', '${data.category}', '${data.remark}' )`;
    const results = await (await getDB()).executeSql(query);
    return results[0].rowsAffected;
};

export const deleteEntry = async (tableName, id) => {
    const query = `DELETE from '${tableName}' where id = ${id}`;
    return await (await getDB()).executeSql(query);
};
