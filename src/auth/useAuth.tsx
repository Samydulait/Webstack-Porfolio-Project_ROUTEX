// This is where we goin to be creating our own custom auth provider
import {
  useEffect,
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "./initFirebase";
import { removeTokenCookie, setTokenCookie } from "./tokenCookies";

// This involve the creation of the context component and the provider component that uses the context.

initFirebase();         // we call initFirebase thus firebase is initialized: 

interface IAuthContext {            // the creation of the context starts here
    user: firebase.User | null;
    logout: () => void;
    authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({        // Ends here
    user: null,
    logout: () => null,
    authenticated: false,
});

export const AuthProvider: FunctionComponent = ({children}) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const router = useRouter();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
         router.push("/")            //this to push the user to home page
      })
      .catch((e) => {                   // because it might throw an exceptionary error, we need to catch then create catch() and log it to the console
          console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListerner = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
            const token = await user.getIdToken();
            setTokenCookie(token);
            setUser(user);
        } else {
            removeTokenCookie();
            setUser(null);
        }
      });

    return () => {                        // called when the component unmounts
        cancelAuthListerner();              
    };
  }, []);

  return (                                                                        // user, logout and Authenticated are components to the children in teh context
    <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>        
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
    return useContext(AuthContext);
}


