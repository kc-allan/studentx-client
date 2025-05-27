import { ShoppingCart } from "lucide-react";

const EmptyState = ({ icon, title, description, action }) => (
  <div className="bg-white rounded-xl w-full flex items-center border border-dashed border-gray-300 p-8 text-center">
    <div className="mx-auto flex flex-col w-full items-center justify-center max-w-xs">
      <span className="mb-4">{icon}</span>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {action}
    </div>
  </div>
);

export default EmptyState;