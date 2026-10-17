import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
   name:'profile',
   initialState:{
        showProfile:false,
        lire:false,
        favorites:[],
        lireFavorite:false,
        
   },
   reducers:{
            setShowProfile:(state,action)=>{state.showProfile = action.payload},
            setFavorites:(state,action)=>{state.favorites = action.payload},
            setLire:(state,action)=>{state.lire = action.payload},
            setLireFavorite:(state,action)=>{state.lireFavorite = action.payload},
   }
})
export const { setShowProfile, setFavorites,setLire,setLireFavorite} = profileSlice.actions;
export default profileSlice.reducer;