const database = {
    getUser: (id, callback) => {
        const users = [{
            id: 1,
            name: 'Robert',
        }, {
            id: 2,
            name: 'John'
        }];

        const user = users.find((user) => user.id === id);
        if (!user) {
            callback(`User with id=${id} not found`);
        } else {
            callback(null, user);
        }
    },
    getUsersBook: (userId, callback) => {
        const usersBooks = {
            1: [],
            2: [1, 2],
        };

        const userBook = usersBooks[userId];
        if (!userBook) {
            callback(`Set of books related to userId=${userId} not found`);
        } else {
            callback(null, userBook);
        }
    },
    buyBook: (id, callback) => {
        const books = [{
            id: 1,
            name: 'Art of war'
        }, {
            id: 2,
            name: 'Hunger games'
        }, {
            id: 3,
            name: '1984'
        }];

        const book = books.find((book) => book.id === id);
        if (!book) {
            callback(`Book with id=${id} not found`);
        } else {
            callback(null, true);
        }
    },
};


const buyBookForUser = async (bookId, userId) => {

    const currentUserId = await new Promise((resolve, reject) => {
        database.getUser(userId, err => {
            if (err) {
                reject(err)
            }
            resolve(userId);
        })
    });

    await new Promise((resolve, reject) => {
        database.getUsersBook(currentUserId, (err, userBooks) => {
            if (err) {
                reject(err)
            }
            if (userBooks.includes(bookId)) {
                reject(`User already has book with id=${bookId}`);
            }
            resolve(userBooks);
        })
    });

    return new Promise((resolve, reject) => {
        database.buyBook(bookId, err => {
            if (err) {
                reject(err)
            }
            resolve('Success');
        });
    })

}


(async() => {

    try {
        const message = await buyBookForUser(1,1);
        console.log(message) // 'Success'
    } catch (err) {
        console.log(err) // null
    }

    try {
        const message = await buyBookForUser(1,2);
        console.log(message) // undefined
    } catch (err) {
        console.log(err) // 'User already has book with id=1'
    }

    try {
        const message = await buyBookForUser(3,2);
        console.log(message) // 'Success'
    } catch (err) {
        console.log(err) // null
    }

    try {
        const message = await buyBookForUser(5,2);
        console.log(message) // undefined
    } catch (err) {
        console.log(err) // 'Book with id=5 not found'
    }

    try {
        const message = await buyBookForUser(1,3);
        console.log(message) // undefined
    } catch (err) {
        console.log(err) // 'User with id=3 not found'
    }

})();
