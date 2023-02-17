
export function arrayFind(array: any[], callback: (value: any, index: number, array: any[]) => boolean): any | undefined {
    if ('find' in array) 
        return array.find(callback)
    for (let i = 0; i < (array as Array<any>).length; i++) {
        if (callback(array[i], i, array)) return array[i]
    }
    return undefined
}

export function arrayIncludes(arr: any[], value: any): boolean {
    return arr.indexOf(value) !== -1
}

export function strIncludes(str: string, value: string): boolean {
    return str.indexOf(value) !== -1
}
