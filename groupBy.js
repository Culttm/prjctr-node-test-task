// { '3': [3.6, 3.7], '6': [6.4], '8': [8.9] }

const groupBy = (array, func) => {
    const result = {};

    for (let i = 0; i < array.length; i++) {
        const current = array[i];
        const r = func.call(this, current);
        if (r) {
            if (result[r]) {
                result[r].push(current)
            } else {
                result[r] = [current]
            }
        }
    }

    return result
}

const result = groupBy([3.6, 3.7, 6.4, 8.9],  Math.floor);

console.log(result);
