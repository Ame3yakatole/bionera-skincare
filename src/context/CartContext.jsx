
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

// Read the saved cart when the app starts.
function getInitialCart() {
  try {
    const savedCart = localStorage.getItem("bionera-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getInitialCart);

  // Save cart changes in the browser.
  useEffect(() => {
    localStorage.setItem("bionera-cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product or increase its quantity.
  function addToCart(product) {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  }

  // Remove a product completely.
  function removeFromCart(productId) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );
  }

  // Update quantity without allowing zero or negative values.
  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
