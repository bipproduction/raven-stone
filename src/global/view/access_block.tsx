import { useAtom } from "jotai";
import { func_global_handle_component_role } from "../fun/fun_handle_component_role";
import { val_global_component_access_user_role } from "../val/val_list_user_role";
import { Overlay } from "@mantine/core";
import { Badge } from "antd";
import React from "react";
import { useShallowEffect } from "@mantine/hooks";
import { val_global_list_component_name } from "../val/val_list_component_name";
import _ from "lodash";

/**
 * # Template
 * ```jsx
 * <ViewGlobalAccessBlock>
                
   </ViewGlobalAccessBlock>
 * ```
 */
export function ViewGlobalAccessBlock({
  name,
  children,
}: //   name,
{
  name: string;
  children: React.ReactNode;
  //   name?: string;
}) {
  //   const name: any = (children as any)?.type.name;
  const [listComponent, setComponent] = useAtom(
    val_global_component_access_user_role
  );

  const ada = func_global_handle_component_role({
    name: name,
    listComponent,
  });

  const [listCompanentName, setlistComponentname] = useAtom(
    val_global_list_component_name
  );

  useShallowEffect(() => {
    if (name && !_.isEmpty(name) && !listCompanentName.includes(name)) {
      //   console.log(name == null, _.isEmpty(name), name);
      const data = _.clone(listCompanentName);
      data.push(name);
      setlistComponentname(data);
    }
  }, [name, listCompanentName]);

  if (!ada) return <></>;
  return <>{children}</>;
}
