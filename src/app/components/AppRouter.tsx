import { Route, Switch } from "react-router-dom";
import { AboutPage, HomePage, LoginPage } from "../../pages";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/about'>
        <AboutPage />
      </Route>
      <Route exact path='/login'>
        <LoginPage />
      </Route>
      {/*  <Route exact path='/register'>
        <RegisterPage />
      </Route>
      <Route exact path='/products'>
        <ProductListPage />
      </Route>
      <Route exact path='/product/:id'>
        <ProductPage />
      </Route>
      <Route exact path='/news'>
        <NewsPage />
      </Route>
      <Route exact path='/contact'>
        <ContactUsPage />
      </Route>
      <Route exact path='/cart'>
        <CartPage />
      </Route>
      <Route exact path='/checkout'>
        <CheckoutPage />
      </Route>
      <Route exact path='/member/:target'>
        <MemberPage />
      </Route>
      <Route exact path='/member'>
        <MemberPage />
      </Route>
      <Route exact path='/admin/'>
        <AdminPage />
      </Route>
      <Route exact path='/admin/products'>
        <AdminProductListPage />
      </Route>
      <Route exact path='/admin/product'>
        <AdminProductPage />
      </Route>
      <Route exact path='/admin/product/:id'>
        <AdminEditProductPage />
      </Route>
      <Route path='/admin/category/'>
        <AdminCategoryPage />
      </Route>
      <Route exact path='/admin/member'>
        <AdminMemberPage />
      </Route>
      <Route exact path='/admin/orders'>
        <AdminOrderListPage />
      </Route> */}
    </Switch>
  );
};

export default AppRouter;
