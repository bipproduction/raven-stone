import _ from "lodash";
import { api_user_get_all } from "../api/api_user_get_all";

export async function user_get_all() {
    return await fetch("/api/" + _.kebabCase(api_user_get_all.name)).then((res) => res.json())
}