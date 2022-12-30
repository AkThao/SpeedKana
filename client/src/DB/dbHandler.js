import { deleteDB, openDB } from "idb";

export const DB_NAME = "statsDB";
export const OBJECTSTORE_NAME = "stats";

const upgrade = (db) => {
    if (!db.objectStoreNames.contains(OBJECTSTORE_NAME)) {
        db.createObjectStore(OBJECTSTORE_NAME, { keyPath: "id", autoIncrement: true });
    }
};

export const setupDB = async () => {
    // Check for IndexedDB support
    if (!("indexedDB" in window)) {
        console.log("This browser does not support IndexedDB.");
        return;
    };

    await openDB(DB_NAME, 1, { upgrade });
};

export const getLatestTest = async () => {
    return openDB(DB_NAME, 1, { upgrade })
    .then(async (db) => {
        const allTests = await db.getAll(OBJECTSTORE_NAME);
        if (allTests.length === 0) {
            db.close();
            return allTests;
        }
        let latestTest = [allTests[allTests.length - 1]];
        db.close();
        return latestTest;
    })
};

export const getAllTests = async () => {
    return openDB(DB_NAME, 1, { upgrade })
    .then(async (db) => {
        const allTests = await db.getAll(OBJECTSTORE_NAME);
        db.close();
        return allTests;
    });
};

export const saveTest = async (testData) => {
    const db = await openDB(DB_NAME, 1, { upgrade });

    // Write test data to DB
    let tx = db.transaction(OBJECTSTORE_NAME, "readwrite");
    let store = tx.objectStore(OBJECTSTORE_NAME);

    // Add date and time of test to stats
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleString("default", { month: "short" });
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    // const seconds = String(now.getSeconds()).padStart(2, "0");

    testData["date_time"] = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes;
    await store.put(testData);

    db.close();
};

export const deleteTest = async (testId) => {
    const db = await openDB(DB_NAME, 1, { upgrade });

    // Clear data for testId from IndexedDB
    let tx = db.transaction(OBJECTSTORE_NAME, "readwrite");
    let store = tx.objectStore(OBJECTSTORE_NAME);

    await store.delete(testId);

    db.close();
};

export const deleteAllTests = async () => {
    await deleteDB(DB_NAME, {
        blocked() {
            console.log("Database deletion blocked");
        },
    }).then(() => {
        console.log("Database deleted");
    });
};
