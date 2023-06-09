import _ from "lodash";
import { api_user_get_all } from "../api/api_user_get_all";

const url = "/api/" + "api_user_get_all"
// api_user_get_all
export async function user_get_all() {
    return await fetch(url).then((res) => res.json())
}