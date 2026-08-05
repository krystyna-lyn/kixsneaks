import { useContext } from "react";
import ShopContext from "../context/ShopContext";

export const useShop = () => {
    return useContext(ShopContext);
};