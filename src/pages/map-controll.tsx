import { gIsDev } from "@/g_state/g_is_dev";
import LayoutMapControll from "@/layouts/map_controll/map_controll";
import { api } from "@/lib/api";
import { useHookstate } from "@hookstate/core";
import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useInputState, useShallowEffect } from "@mantine/hooks";
import * as echarts from "echarts";
import EChartsReact from "echarts-for-react";
import { PropsWithChildren, useState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import toast from "react-simple-toasts";
import DevAuthProvider from "../layouts/dev/dev_auth_provider";

// import $ from "jquery";

const MapControll = () => {
  return (
    <>
      <DevAuthProvider>
        <LayoutMapControll />
      </DevAuthProvider>
    </>
  );
};

export default MapControll;
