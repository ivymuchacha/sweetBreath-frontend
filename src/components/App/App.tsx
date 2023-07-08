import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
// import { Up, scrollToAnchor } from "../Anchor";
import Navbar from "../Navbar";
// import AdminNavbar from "../AdminNavbar";
// import Footer from "../Footer";
// import {
//   HomePage,
//   AboutPage,
//   LoginPage,
//   RegisterPage,
//   ProductListPage,
//   ProductPage,
//   NewsPage,
//   ContactUsPage,
//   CartPage,
//   CheckoutPage,
//   MemberPage,
//   AdminPage,
//   AdminProductListPage,
//   AdminProductPage,
//   AdminEditProductPage,
//   AdminMemberPage,
//   AdminOrderListPage,
//   AdminCategoryPage
// } from "../../pages";
import { AuthContext, LoadingContext } from "../../context/contexts";
import { User, useAuthContext } from "../../context";
import { getAuthToken } from "../../utils";

// @ts-expect-error
import { getMe } from "../../webAPI/userAPI";
// import { getAuthToken, ScrollToTop } from "../../utils";

const useViewInit = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

// function App() {
//   const [isLoadingGetMe, setLoadingGetMe] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (getAuthToken()) {
//       getMe().then((response) => {
//         if (response.ok) {
//           setUser(response.data);
//           setLoadingGetMe(false);
//         }
//       });
//     } else {
//       setLoadingGetMe(false);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       <LoadingContext.Provider
//         value={{ isLoading, setIsLoading, isLoadingGetMe }}>
//         <Router>
//           <NavBarsInUse user={user} />
//           <ScrollToTop />
//           <Up onClick={() => scrollToAnchor("top")}>
//             <span>⇧</span>
//           </Up>
//           <Switch>
//             <Route exact path='/'>
//               <HomePage />
//             </Route>
//             <Route exact path='/about'>
//               <AboutPage />
//             </Route>
//             <Route exact path='/login'>
//               <LoginPage />
//             </Route>
//             <Route exact path='/register'>
//               <RegisterPage />
//             </Route>
//             <Route exact path='/products'>
//               <ProductListPage />
//             </Route>
//             <Route exact path='/product/:id'>
//               <ProductPage />
//             </Route>
//             <Route exact path='/news'>
//               <NewsPage />
//             </Route>
//             <Route exact path='/contact'>
//               <ContactUsPage />
//             </Route>
//             <Route exact path='/cart'>
//               <CartPage />
//             </Route>
//             <Route exact path='/checkout'>
//               <CheckoutPage />
//             </Route>
//             <Route exact path='/member/:target'>
//               <MemberPage />
//             </Route>
//             <Route exact path='/member'>
//               <MemberPage />
//             </Route>
//             <Route exact path='/admin/'>
//               <AdminPage />
//             </Route>
//             <Route exact path='/admin/products'>
//               <AdminProductListPage />
//             </Route>
//             <Route exact path='/admin/product'>
//               <AdminProductPage />
//             </Route>
//             <Route exact path='/admin/product/:id'>
//               <AdminEditProductPage />
//             </Route>
//             <Route path='/admin/category/'>
//               <AdminCategoryPage />
//             </Route>
//             <Route exact path='/admin/member'>
//               <AdminMemberPage />
//             </Route>
//             <Route exact path='/admin/orders'>
//               <AdminOrderListPage />
//             </Route>
//           </Switch>
//           <Footer />
//         </Router>
//       </LoadingContext.Provider>
//     </AuthContext.Provider>
//   );
// }

const AppProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingGetMe, setLoadingGetMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((response: any) => {
        if (response.ok) {
          setUser(response.data);
          setLoadingGetMe(false);
        }
      });
    } else {
      setLoadingGetMe(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <LoadingContext.Provider
        value={{ isLoading, setIsLoading, isLoadingGetMe }}>
        <Router>{children}</Router>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
};

const NavBarsInUse = ({ user }: { user: User | null }) => {
  if (!user || !user.is_admin) {
    return <Navbar />;
  }
  // return <AdminNavbar />;
  return "AdminNavbar";
};

const AppContent = () => {
  const { user } = useAuthContext();
  useViewInit();
  return (
    <>
      <NavBarsInUse user={user} />
    </>
  );
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);
export default App;
