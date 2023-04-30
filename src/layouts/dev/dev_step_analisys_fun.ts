import { api } from "@/lib/api";
import { _valStepNamelist } from "./dev_step_analisys_val";


export async function _funStepAnalisysLoadListname() {
    fetch(api.apiDevStepAnalisysLoadListName)
        .then((v) => v.json())
        .then((v) => {
            _valStepNamelist.value = v;
        });
}