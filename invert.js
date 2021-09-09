// { 'some': 'a', 'object': 'b', '1': 'c' }
const invert = (obj) => {
    return Object.entries(obj).reduce((prev, [k, v]) => {
        prev[v] = k;
        return prev
    }, {});
}

const result = invert({ 'a': 'some', 'b': 'object', 'c': 1 });

console.log(result)
