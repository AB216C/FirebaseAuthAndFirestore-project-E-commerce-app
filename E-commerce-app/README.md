
## To Install and run the application
npx create-vite E-commerce-app --template react-ts,
cd E-commerce-app,
npm install @reduxjs/toolkit,
npm install react-redux,
npm install @tanstack/react-query,
npm install axios,
npm install firebase
npm install react-router-dom
npm install --save-dev @types/react-router-dom
npm run dev

## Project features

The proeject is made of six main folders: api, app, components, features/cart and two main files such as firebaseConfig.ts and main.tsx. Api folder, has as file named firebaseProducts.ts. The main purpose for this file is to set up imported functions from firebase/firestore that will help to interact with Firestore database. Those functions  include {collection, getDocs, addDoc, updateDoc, deleteDoc, and doc}. 

In the app folder, store.ts file was created to set up Redux toolkit. In this file, we export store to be used and accessed glabally. We export Rootstate to be used in type safety checking when accessing data , and we export AppDispatch to be used in type safety when dispatching actions.

In the components folder, there are 7 files: AdminProductManager file uses firestore as backend to add, edit, view, and delete products. Plus, it uses form input to manage all editing states using form inputHandler:handleChnage and submit handler:handleSubmit. It uses useEffect hook by which anytime the component mounts, allows fetching products from firestore and maintaining their states. Cart.tsx uses both Redux( useSelector and  useDispatch ) for state management and Firebase firestore to store orders. This component also display shopping cart to the users and allow them to view items and totals, remove individual item, place order and get it saved to firebase and clearing the cart after checkout. Home.tsx is using both React Query and Firebase Firestore to fetch data mainly fetching products categories and filtering products by category, and Redux to dispatch actions mainly addToCart function. The Login.tsx allow users to create accounts and log in with password and email before accessing application data. It uses signInWithEmailAndPassword, a firebase Auth function which help users to complete sign in process. It uses useState, a React Hook which helps to manage state for forms and errors. The Navbar.tsx has a very important function called const [user] = useAuthState(auth) and plays a role in retrieving logged-in users from firebase. It also uses a function called auth.SignOut and log the users out once logout button is clicked. OrderHistory.tsx component shows order history from all logged in users from Firestore, fetch the orders for the current user using a specific query  where("userId", "==", auth.currentUser?.uid), display individual order's price, id, and date created, and handle date conversion. Register.tsx component allow users to create auth accounts before logging in and redirect users to the homepage after the login is successful.

feature/cart component has cartSlice.ts and this is where reducers and actions are created and after being created, they are exported to be used in components. This file use sessionStorage, a built-in Web-API which is essential in which cart updates are saved to help in restoring cart state on page reloads and preventing user data loss during users hoverings sessions. The folder has type.ts file which shape the type or structure of items in the cart, and it is exported to be used in Redux function and components.

App.tsx allow users to view and access navbar, cart, home, orderHistory, and AdminProductManager components after they logging in successfully. And use this code <Route path="*" element={<Navigate to="/login" />} /> to direct unthorized users to log in page. 

The firebaseConfig.ts is helping to export Firestore, the database(db) and Authentication(auth) services to be used by the application.

Main.tsx is using <React.StrictMode> to find bugs and enforcing best practices during development of the app, <Provider store={store}> to make redux store available to all components in the app, <QueryClientProvider client={queryClient}> to allow the availability React Query in the whole app, and <BrowserRouter> for routing using browserhistory(navigation from one page to another wihout reloading the page).


# Source code
https://youtu.be/PngrpszT3aY?si=osBqDeZ9vnJhqnrc
https://firebase.google.com/docs/auth/web/start
https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
https://firebase.google.com/docs/firestore
https://youtu.be/vAoB4VbhRzM?si=DUrThUgDSPSqKWG0





