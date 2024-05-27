import Image from "next/image"
import { FaTrash } from "react-icons/fa"
import { IoIosClose } from "react-icons/io"

const CartModal = ({ cartModalOpen, handleCartModal }) => {
    if (!cartModalOpen) {
      return null; // Ne rien rendre si le modal est fermé
    }
  
    return (
      <div className="w-[300px] h-[100vh] overflow-y-auto fixed top-[50px] right-0 bg-white border border-l-gray-700 pb-16">
        <button onClick={handleCartModal} className="text-gray-700 absolute top-2 right-2">
          <IoIosClose />
        </button>
      </div>
    );
  };
  
  export default CartModal;
        
    
