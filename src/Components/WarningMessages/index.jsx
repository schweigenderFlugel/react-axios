import { ExclamationTriangleIcon } from "@heroicons/react/24/outline" 

const WarningMessage = ({ children }) => {
    return (
        <div
            className="flex bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative font-bold"
            role="alert"
          ><ExclamationTriangleIcon className="h-6 w-6 ml-1 mr-2"></ExclamationTriangleIcon>
          <p>{children}</p>
          </div>
    )
}

export default WarningMessage;