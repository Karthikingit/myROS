import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "grid-outline",
    link: "/dashboard",
    home: true,
  },
  {
    title: "Cash Management",
    icon: "briefcase-outline",
    children: [
      {
        title: "Cash up",
        icon: "pricetags-outline",
        link: "/accounting/cashup",
      },
      {
        title: "Deposit",
        icon: "pricetags-outline",
        link: "/accounting/deposit",
      },
      {
        title: "Reconciliation",
        icon: "file-add-outline",
        link: "/accounting/reconciliation",
      },
      {
        title: "Reports",
        icon: "file-text-outline",
        link: "/accounting/report",
      },
    ],
  },
  {
    title: "Employee",
    icon: "people-outline",
    children: [
      {
        title: "Attendance",
        link: "/employee/attendance",
      },
      {
        title: "Requests",
        link: "/employee/request",
      },
      {
        title: "Payroll",
        link: "/employee/payroll",
      },
    ],
  },
  {
    title: "Stock",
    icon: "pricetags-outline",
    children: [],
  },
  {
    title: "Auth",
    icon: "lock-outline",
    children: [
      {
        title: "Login",
        link: "/auth/login",
      },
      {
        title: "Register",
        link: "/auth/register",
      },
      {
        title: "Request Password",
        link: "/auth/request-password",
      },
      {
        title: "Reset Password",
        link: "/auth/reset-password",
      },
    ],
  },
];
