import {
    atom,
} from 'recoil';

export const modalState = atom({
    key: "modalShowed",
    default: null
})

export const themeState = atom({
    key: "themeState",
    default: "white"
})

export const user = atom({
    key: "user",
    default: false
})