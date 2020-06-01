export const isItDark = (theme) => {
    return {
        type: "SAVE_THEME",
        theme
    }
}

export const saveStr = str => {
    return {
        type: "SAVE_STRPOINT",
        str
    }
}