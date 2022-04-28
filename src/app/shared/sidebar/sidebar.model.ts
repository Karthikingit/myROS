interface Mytype {
  name: string;
  link: string;
  icon: string;
}
export class Sidebar {
  name: string;
  pages: string;
  link: string;
  icon: string;
  children: Mytype[];
}

export const SIDEBAR_MENU_ITEMS = [
  // {
  //   name: "Cash Management",
  //   pages: "pages1",
  //   link: "accounting",
  //   icon: "icon-cashmanagement icon",
  //   children: [
  //     {
  //       name: "Cash Up",
  //       link: "/accounting/cashup",
  //       icon: "icon-cashup icon",
  //     },
  //     {
  //       name: "Deposit",
  //       link: "/accounting/cashup/deposit",
  //       icon: "icon-deposit icon",
  //     },
  //     {
  //       name: "Reconciliation",
  //       link: "/accounting/reconciliation",
  //       icon: "icon-reconciliation icon",
  //     },
  //     {
  //       name: "Reports",
  //       link: "/accounting/report",
  //       icon: "icon-report icon",
  //     },
  //   ],
  // },
  // {
  //   name: "Integration",
  //   pages:"pages4",
  //   link: "/integration",
  //   icon:"icon-integration icon",
  //   children:[]
  // },

  {
    name: "Settings",
    pages: "pages5",
    link: "/settings",
    icon: "icon-setting icon",
    children: [
      {
        name: "Account",
        link: "/account",
        icon: "icon-integration icon",
      },
      // {
      //   name: "Subscription",
      //   link: "/subscription",
      //   icon: "icon-payroll icon",
      // },
    ]
  },

  // {
  //   name: "Employees",
  //   pages: "pages2",
  //   link: "",
  //   icon: "icon-employee icon",
  //   children: [
  //     {
  //       name: "Employees",
  //       link: "/emp-management/employees",
  //       icon: "icon-team icon",
  //     },
  //     {
  //       name: "Shift Calendar",
  //       link: "/emp-management/shift-calendar",
  //       icon: "icon-payroll icon",
  //     },
  //     {
  //       name: "Attendance",
  //       link: "/emp-management/attendance",
  //       icon: "icon-rota icon",
  //     },
  //     {
  //       name: "Requests",
  //       link: "/emp-management/requests",
  //       icon: "icon-requests icon",
  //     },
  //     {
  //       name: "Leaves",
  //       link: "/emp-management/leaves",
  //       icon: "icon-leaves icon",
  //     },
  //     {
  //       name: "Payroll",
  //       link: "/emp-management/payroll",
  //       icon: "icon-report icon",
  //     },
  //     {
  //       name: "Profile",
  //       link: "/emp-management/profile",
  //       icon: "icon-profile icon",
  //     },
  //   ],
  // },
  // {
  //   name: "Inventory",
  //   pages: "pages3",
  //   link: "",
  //   icon: "icon-stock icon",
  //   children: [
  //     {
  //       name: "Products",
  //       link: "/products",
  //       icon: "icon-products icon",
  //     },
  //     {
  //       name: "Suppliers",
  //       link: "/suppliers",
  //       icon: "icon-suppliers icon",
  //     },
  //     {
  //       name: "Purchase Order",
  //       link: "/purchaseorder",
  //       icon: "icon-purchase icon",
  //     },
  //     {
  //       name: "Invoices",
  //       link: "/invoices",
  //       icon: "icon-invoices icon",
  //     },
  //     {
  //       name: "Reports",
  //       link: "/report",
  //       icon: "icon-reports icon",
  //     },
  //   ],
  // },
];
