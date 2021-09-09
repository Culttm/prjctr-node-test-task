const checkParentheses = (str) => {
    const symbols = {
        ')': '(',
        '}': '{',
        ']': '[',
    };
    const buffer = [];
    const symbolsClosed = [')', ']', '}'];
    const cleanString = str.replace(new RegExp('[^\\[\\](){}]', 'g'), '');

    for (let i = 0; i < cleanString.length; i++) {
        const current = cleanString[i];
        if (symbolsClosed.includes(current)) {
            if (symbols[current] !== buffer.pop()) {
                return false
            }
        } else {
            buffer.push(current)
        }
    }

    return !buffer.length;
}

console.log(checkParentheses('--()--')) // true
console.log(checkParentheses('-a]--[')) // false
console.log(checkParentheses('dsa{vsfs{ad')) // false
console.log(checkParentheses('j78(g5b]uyg')) // false
console.log(checkParentheses(',m{i987y}hj')) // true
console.log(checkParentheses('dsa[3ed---:]::')) // true
