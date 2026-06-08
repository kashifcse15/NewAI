import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const dummyUser = { name: "User", id: "1" };
const dummyChats = [{ id: "1", title: "New Chat" }];

const AppContext = createContext();
export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const fetchUser = async () => {
        setUser(dummyUser); // we don't have a real user yet
    }

    const fetchUserChats = async () => {
        setChats(dummyChats);
        setSelectedChat(dummyChats[0]);
    };

    useEffect(() => {
        if (user) {
            fetchUserChats();
        }
        else {
            setChats([]);
            setSelectedChat(null);
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('theme',theme);    
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    
    }, [theme]);


useEffect(() => {
    fetchUser();
}, [])

const value = {
    user, chats, selectedChat, theme, setTheme, fetchUser,
    setSelectedChat, setChats, navigate,
}
return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
)
}
export const useAppContext = () => useContext(AppContext);