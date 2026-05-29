import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import designsReducer from "./reducers/designSlice";
import signUpEmail from "./reducers/email";
import user from "./reducers/userSlice";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  designs: designsReducer,
  signUpEmail: signUpEmail,
  user: user,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "signUpEmail", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
