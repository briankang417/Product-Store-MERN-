import { create } from "zustand";

export const useUserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    registerUser: async (newUser) => {
        if (!newUser.username || !newUser.email || !newUser.password) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        // Optionally, you can also update the local user store after registration
        set((state) => ({ users: [...state.users, data.data] }));
        return { success: true, message: "User registered successfully." };
    },
    fetchUsers: async () => {
        const res = await fetch("/api/users"); // Adjust API endpoint as necessary
        const data = await res.json();
        set({ users: data.data });
    },
}));
