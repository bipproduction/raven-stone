import { AppShell, Header, NavLink, Navbar, Title } from "@mantine/core";
import { PropsWithChildren } from "react";

export function DevDashboardLayout({ children }: PropsWithChildren) {
  return (
    <AppShell
      header={
        <Header height={70}>
          <Title>Ini Header</Title>
        </Header>
      }
      navbar={
        <Navbar w={300}>
          <NavLink label={"User"} />
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}
