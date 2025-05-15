// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from 'react';
// import { User } from '@/types/user';
// import { useSelector } from 'react-redux';

// interface AuthContextInterface {
//   isAuthenticated: boolean;
//   user: User | null;
// }

// const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

// const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const user = useSelector((state: any) => state.auth.user);
//   const isAuthenticated = !!user;

//   React.useEffect(() => {
//     // console.log('isAuthenticated:', isAuthenticated, user, localStorage.getItem('user'), document.cookie || "No cookies");
//     console.log("state", user);
    
//   }, [isAuthenticated]);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuthContext = (): AuthContextInterface => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }
//   return context;
// };

// export { AuthProvider, useAuthContext };
