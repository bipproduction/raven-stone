import { atomWithStorage } from "jotai/utils";

type Menu = "1" | "2"
export const val_selected_menu_id = atomWithStorage<Menu>("val_selected_menu_id", "1");