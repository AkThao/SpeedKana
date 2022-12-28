import { openDB } from "idb";

export const DB_NAME = "statsDB";
export const OBJECTSTORE_NAME = "stats";

export const setupDB = async () => {
    // Check for IndexedDB support
    if (!("indexedDB" in window)) {
        console.log("This browser does not support IndexedDB.");
        return;
    }

    // Set up DB
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(OBJECTSTORE_NAME)) {
                db.createObjectStore(OBJECTSTORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        },
    });

    db.close();
}


export const getLatestTest = async () => {
    const db = await openDB(DB_NAME, 1);

    // Retrieve latest test data from DB\
    let tx = db.transaction(OBJECTSTORE_NAME, "readonly");
    let store = tx.objectStore(OBJECTSTORE_NAME);

    // We could get the last test result by counting the records in the object store then using store.get(id), where id == count
    // But if a test result other than the last one is deleted then the ids will no longer align with the indices
    // Hence, we're using store.getAll() then indexing the last element in the returned array
    let allTests = await store.getAll();
    if (allTests.length === 0) {
        db.close();
        return allTests;
    }

    let latestTest = [allTests[allTests.length - 1]];

    db.close();

    return latestTest;
}

export const getAllTests = async () => {
    const db = await openDB(DB_NAME, 1);

    // Retrieve all test data from DB
    let tx = db.transaction(OBJECTSTORE_NAME, "readonly");
    let store = tx.objectStore(OBJECTSTORE_NAME);

    let allTests = await store.getAll();

    db.close();

    return allTests;
}

export const saveTest = async (testData) => {
    const db = await openDB(DB_NAME, 1);

    // Write test data to DB
    let tx = db.transaction(OBJECTSTORE_NAME, "readwrite");
    let store = tx.objectStore(OBJECTSTORE_NAME);

    // Add date and time of test to stats
    const now = new Date();
    testData["date_time"] = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    await store.put(testData);

    db.close();
}

export const deleteTest = async (testId) => {
    const db = await openDB(DB_NAME, 1);

    // Clear all data from IndexedDB
    let tx = db.transaction(OBJECTSTORE_NAME, "readwrite");
    let store = tx.objectStore(OBJECTSTORE_NAME);

    await store.delete(testId);

    db.close();
}

export const deleteAllTests = async () => {
    const db = await openDB(DB_NAME, 1);

    // Clear all data from IndexedDB
    let tx = db.transaction(OBJECTSTORE_NAME, "readwrite");
    let store = tx.objectStore(OBJECTSTORE_NAME);

    await store.clear();

    db.close();
}
