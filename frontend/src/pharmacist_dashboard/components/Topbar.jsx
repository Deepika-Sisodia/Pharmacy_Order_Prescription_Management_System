const Topbar = () => {
  return (
    <div className="w-full bg-teal-800 text-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold">Apollo Pharmacy</div>
        <div className="text-sm opacity-90">Pharmacist Dashboard</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-2xl">🔔</div>
        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full w-10 h-10 border-2 border-teal-300"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default Topbar;
