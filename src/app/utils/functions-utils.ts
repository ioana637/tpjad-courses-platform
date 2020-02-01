export function string2Bin(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i));
    }
    return result;
}

export function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}