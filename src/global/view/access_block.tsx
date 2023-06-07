import { useAtom } from "jotai";
import { func_global_handle_component_role } from "../fun/fun_handle_component_role";
import { val_global_component_access_user_role } from "../val/val_list_user_role";
import { Overlay } from "@mantine/core";
import { Badge } from "antd";

export function ViewGlobalAccessBlock({ name }: { name: string }) {
  const [listComponent, setComponent] = useAtom(
    val_global_component_access_user_role
  );
  
  const ada = func_global_handle_component_role({
    name: name,
    listComponent,
  });
  return (
    <>
      {!ada && (
        <Overlay blur={10} center>
          <Badge>No Access</Badge>
        </Overlay>
      )}
    </>
  );
}
