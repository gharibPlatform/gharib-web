import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { createKhatma, getKhatmaDetails } from "@/utils/apiKhatma";
const KhatmaContext = createContext();

export function KhatmaProvider({ children }) {
    const [khatmas, setKhatmas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchKhatmas();
    }, []);

    async function fetchKhatmas() {
        try {
        const data = await getKhatmaDetails();
            setKhatmas(data);
        } catch (error) {
            console.error("Failed to fetch khatmas: ", error);
        } finally {
            setLoading(false);
        }
    }    
           
    const handleCreateKhatma = async (data) => {
        try {
            await createKhatma(data);
            await fetchKhatmas();
        } catch (error) {
            console.error("Failed to block user:", error);
        }
    };

    return (
        <GroupContext.Provider value={{ handleCreateKhatma, khatmas, loading }} >
            {children}
        </GroupContext.Provider>
    );
}

export function useKhatmaContext() {
  return useContext(KhatmaContext);
}
