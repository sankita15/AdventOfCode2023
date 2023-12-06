const calculateCalibrationValues = (text) => {
    const textArr = text.split('\n');
    let sum = 0;
    for(let i=0; i<textArr.length; i++) {
        let j = 0;
        let k = textArr[i].length - 1;
        while(j!==k) {
            if((textArr[i].charCodeAt(j) >= 97 && textArr[i].charCodeAt(j) <= 122) && (textArr[i].charCodeAt(k) >= 97 && textArr[i].charCodeAt(k) <= 122)) {
                j++;
                k--;
            } else if (textArr[i].charCodeAt(j) >= 97 && textArr[i].charCodeAt(j) <= 122) {
                j++;
            } else if (textArr[i].charCodeAt(k) >= 97 && textArr[i].charCodeAt(k) <= 122) {
                k--;
            } else {
                break;
            }
        }
        const value = textArr[i].charAt(j).toString()+ textArr[i].charAt(k).toString();
        sum = sum + parseInt(value);
    }
    return sum;
}

const text = '1abc2\n' +
    'pqr3stu8vwx\n' +
    'a1b2c3d4e5f\n' +
    'treb7uchet';
console.log(calculateCalibrationValues(text));
