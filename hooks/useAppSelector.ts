import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
// Use throughout your app instead of plain `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
