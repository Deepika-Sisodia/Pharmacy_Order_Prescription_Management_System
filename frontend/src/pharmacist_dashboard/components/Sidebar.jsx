const Sidebar = ({ selected, setSelected }) => {
  const menus = [
    "Dashboard",
    "Verification",
    "Orders",
    "Billing",
    "Inventory",
  ];

  return (
    <div className="w-64 h-screen bg-teal-900 text-white fixed shadow-lg">
      <div className="p-6 border-b border-teal-700">
        <h2 className="text-2xl font-bold">Apollo Pharmacy</h2>
        <p className="text-xs text-teal-200">Admin Dashboard</p>
      </div>
      <ul className="mt-4">
        {menus.map((menu) => (
          <li
            key={menu}
            className={`px-4 py-3 cursor-pointer transition ${
              selected === menu
                ? "bg-teal-700 border-l-4 border-teal-300 font-semibold"
                : "hover:bg-teal-800"
            }`}
            onClick={() => setSelected(menu)}
          >
            {menu}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
