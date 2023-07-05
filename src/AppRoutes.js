import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import RecipePage from "./pages/RecipePage";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./hoc/RequireAuth";

const AppRoutes = [
  {
    index: true,
    path: '/',
    element: <Home />
  },
  {
    path: '/recipes',
    element: <Recipes />
  },
  {
    path: '/recipes/:id',
    element: <RecipePage />
  },
  {
    path: '/ingredients',
    element: <RequireAuth><Ingredients/></RequireAuth>
  },
  {
    path: '/signIn',
    element: <SignIn />
  },
  {
    path: '/signUp',
    element: <SignUp />
  },
  {
    path: '*',
    element: <NotFoundPage/>
  }
];

export default AppRoutes;
