import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useProductsContext } from "./Context/CartContext";

const CartModal = ({ cartModalOpen, handleCartModal }) => {
  if (!cartModalOpen) {
    return null; // Ne rien rendre si le modal est fermé
  }

  const { products, decrementQuantity, removeFromCart, incrementQuantity } = useProductsContext();

  const totalPrice = products.reduce((total, product) =>
    total + (product.price * product.quantityProduct), 0);

  return (
    <div className="w-[300px] h-[100vh] overflow-y-auto fixed top-[50px] right-0 bg-white border border-l-gray-700 pb-16 z-50">
      <button onClick={handleCartModal} className="text-gray-700 absolute top-2 right-2" aria-label="Fermer le modal du panier">
        <IoIosClose size={24} />
      </button>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Panier</h2>
        {products.length === 0 ? (
          <p className="text-gray-700">Votre panier est vide</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border-b py-2 flex items-center gap-4">
              <img src={product.image} alt={product.name} width={50} height={50} />
              <div className="flex-1">
                <h3 className="text-lg text-gray-700 font-bold">{product.name}</h3>
                <p className="mt-2 text-gray-700">Quantité: <span className="font-bold">{product.quantityProduct}</span></p>
                <p className="text-sm text-gray-500">Prix: {product.price}€/UT</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center"
                    onClick={() => decrementQuantity(product.id)}
                    aria-label="Diminuer la quantité"
                  >-</button>
                  <button
                    className="w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center"
                    onClick={() => incrementQuantity(product.id)}
                    aria-label="Augmenter la quantité"
                  >+</button>
                  <button
                    className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Retirer l'article"
                  ><FaTrash /></button>
                </div>
              </div>
            </div>
          ))
        )}
        {products.length > 0 && (
          <div className="mt-4">
            <p className="text-lg font-bold text-gray-700">Total: {totalPrice.toFixed(2)}€</p>
            <button className="mt-5 bg-orange-400 hover:bg-orange-600 rounded-md text-white p-2">Proceder de paiement</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
