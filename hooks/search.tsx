import {create} from "zustand";

type SearchBox = {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose:()=> void;
    toggle: ()=> void;
}

export const searchFunc= create<SearchBox>((set,get)=>({
    isOpen: false,
    onOpen:() => set({isOpen:true}),
    onClose:() => set({isOpen: false}),
    toggle:()=> set({isOpen:!get().isOpen})
}))