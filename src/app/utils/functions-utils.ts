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

export function isNotNullUndefinedEmpty(text: string): boolean {
    if (text !== null && text !== undefined && text.length !== 0) {
        return true;
    }
    return false;
}