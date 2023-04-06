import { signal } from "@preact/signals-react";

const adminDashboardState = signal("1")
export const sAdminDashboardView = {
    get: () => {
        const p = localStorage.getItem('admin_page') ?? "1";
        adminDashboardState.value = p
        return adminDashboardState.value
    },
    set: (value: string) => {
        localStorage.setItem('admin_page', value)
        adminDashboardState.value = value
    }
}

