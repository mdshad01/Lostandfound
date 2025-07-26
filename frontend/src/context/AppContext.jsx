// context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]); // lost & found items
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch user auth status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) setUser(data.user);
      else setUser(null);
    } catch {
      setUser(null);
    }
  };

  // Fetch all lost & found items
  const fetchItems = async () => {
    try {
      const { data } = await axios.get("/api/item/list");
      if (data.success) setItems(data.items);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Post a new lost/found item
  const postItem = async (itemData) => {
    try {
      const { data } = await axios.post("/api/item/create", itemData);
      if (data.success) {
        toast.success("Item posted!");
        fetchItems();
        navigate("/"); // or wherever you want
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete an item (if allowed)
  const deleteItem = async (itemId) => {
    try {
      const { data } = await axios.delete(`/api/item/${itemId}`);
      if (data.success) {
        toast.success("Item deleted");
        fetchItems();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchItems();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    items,
    setItems,
    searchQuery,
    setSearchQuery,
    fetchItems,
    postItem,
    deleteItem,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
