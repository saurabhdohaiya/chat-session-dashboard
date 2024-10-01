import { FaRegUser } from "react-icons/fa";

const UserIcon = () => {
  return (
    <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-white bg-blue-500 rounded-full p-2 md:p-1">
      <FaRegUser size={16} />
    </div>
  );
};

export default UserIcon;
