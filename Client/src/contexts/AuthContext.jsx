import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("udorm_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        university: userData.university,
        major: userData.major,
        year: userData.year,
        avatar:
          userData.avatar ||
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preferences: {
          budget: userData.budget || "",
          moveInDate: userData.moveInDate || "",
          roommates: userData.roommates || "",
          lifestyle: userData.lifestyle || [],
        },
        favorites: [],
        createdAt: new Date().toISOString(),
      };

      setCurrentUser(newUser);
      localStorage.setItem("udorm_user", JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data - in real app, this would come from API
      const mockUsers = [
        {
          id: 1,
          email: "sarah@university.edu",
          password: "password123",
          name: "Sarah Johnson",
          university: "State University",
          major: "Computer Science",
          year: "Senior",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          preferences: {
            budget: "$800-$1,000",
            moveInDate: "2024-08-01",
            roommates: "1-2 roommates",
            lifestyle: ["Early Riser", "Neat Freak", "No Pets"],
          },
          favorites: [1, 3],
          createdAt: "2024-01-15T10:30:00Z",
        },
      ];

      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // eslint-disable-next-line no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem("udorm_user", JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("udorm_user");
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem("udorm_user", JSON.stringify(updatedUser));
  };

  const toggleFavorite = (listingId) => {
    const updatedFavorites = currentUser.favorites.includes(listingId)
      ? currentUser.favorites.filter((id) => id !== listingId)
      : [...currentUser.favorites, listingId];

    updateProfile({ favorites: updatedFavorites });
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateProfile,
    toggleFavorite,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
