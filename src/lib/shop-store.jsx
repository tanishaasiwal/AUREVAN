import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { getProduct } from "@/lib/products";

const ShopContext = createContext(null);
const CART_KEY = "auraven:cart:v1";
const WISH_KEY = "auraven:wishlist:v1";
const MAX_QTY = 10;

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(
        window.localStorage.getItem(CART_KEY) || "[]",
      );
      const storedWish = JSON.parse(
        window.localStorage.getItem(WISH_KEY) || "[]",
      );
      if (Array.isArray(storedCart)) {
        setCart(
          storedCart.filter(
            (item) => item && getProduct(item.slug) && Number(item.qty) > 0,
          ),
        );
      }
      if (Array.isArray(storedWish)) {
        setWishlist(storedWish.filter((slug) => getProduct(slug)));
      }
    } catch {
      /* ignore unreadable storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const addToCart = useCallback((slug, qty = 1, options = {}) => {
    const product = getProduct(slug);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === slug
            ? { ...item, qty: Math.min(MAX_QTY, item.qty + qty) }
            : item,
        );
      }
      return [...prev, { slug, qty: Math.min(MAX_QTY, qty) }];
    });
    if (options.open !== false) setCartOpen(true);
    toast.success("Added to bag", { description: product.name });
  }, []);

  const setQty = useCallback((slug, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((item) => item.slug !== slug)
        : prev.map((item) =>
            item.slug === slug
              ? { ...item, qty: Math.min(MAX_QTY, qty) }
              : item,
          ),
    );
  }, []);

  const removeItem = useCallback((slug) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug) => {
    const product = getProduct(slug);
    if (!product) return;
    setWishlist((prev) => {
      const exists = prev.includes(slug);
      toast.success(exists ? "Removed from wishlist" : "Saved to wishlist", {
        description: product.name,
      });
      return exists ? prev.filter((item) => item !== slug) : [...prev, slug];
    });
  }, []);

  const items = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProduct(item.slug);
          return product ? { ...product, qty: item.qty } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  const wishlistProducts = useMemo(
    () => wishlist.map((slug) => getProduct(slug)).filter(Boolean),
    [wishlist],
  );

  const value = {
    items,
    count,
    subtotal,
    addToCart,
    setQty,
    removeItem,
    clearCart,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    wishlist,
    wishlistProducts,
    toggleWishlist,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}
