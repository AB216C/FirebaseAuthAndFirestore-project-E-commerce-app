
## To Install and run the application
npx create-vite E-commerce-app --template react-ts;
cd E-commerce-app;
npm install @reduxjs/toolkit;
npm install react-redux;
npm install @tanstack/react-query;
npm install axios;
npm install firebase;
npm install react-router-dom;
npm install --save-dev @types/react-router-dom;
npm run dev;

## Project features

The project is made of six main folders: api, app, components, features/cart, and two main files, such as firebaseConfig.ts and main.tsx. The API folder contains a file named firebaseProducts.ts. The main purpose of this file is to set up imported functions from Firebase/Firestore that will help to interact with the Firestore database. Those functions include {collection, getDocs, addDoc, updateDoc, deleteDoc, and doc}. 

In the app folder, the store.ts file was created to set up the Redux toolkit. In this file, the Store is exported to be used and accessed globally, Rootstate to be used in type safety checking when accessing data, and AppDispatch to be used in type safety when dispatching actions.

In the components folder, there are 7 files: AdminProductManager file uses Firestore as a backend to add, edit, view, and delete products. Plus, it uses form input to manage all editing states using form inputHandler: handleChange and submit handler:handleSubmit. It uses the useEffect hook by which anytime the component mounts, allows fetching products from firestore and maintains their states. Cart.tsx uses both Redux( useSelector and useDispatch ) for state management and Firebase Firestore to store orders. This component also displays a shopping cart to the users and allows them to view items and totals, remove individual items, place an order, and get it saved to Firebase and clear the cart after checkout. Home.tsx is using both React Query and Firebase Firestore to fetch data, mainly fetching product categories and filtering products by category, and Redux to dispatch actions, mainly the addToCart function. The Login.tsx allows users to create accounts and log in with a password and email before accessing application data. It uses signInWithEmailAndPassword, a Firebase Auth function that helps users complete the sign-in process. It uses useState, a React Hook that helps to manage state for forms and errors. The Navbar.tsx has a very important function called const [user] = useAuthState(auth) and plays a role in retrieving logged-in users from Firebase. It also uses a function called auth. Sign out and log the users out once the logout button is clicked. OrderHistory.tsx component shows order history from all logged-in users from Firestore, fetch the orders for the current user using a specific query where("userId", "==", auth.currentUser?.uid), display individual order's price, id, and date created, and handle date conversion. Register.tsx component allows users to create auth accounts before logging in and redirects users to the homepage after the login is successful.

Feature/cart component has cartSlice.ts, and this is where reducers and actions are created, and after being created, they are exported to be used in components. This file uses sessionStorage, a built-in Web-API that is essential for cart updates, and is saved to help in restoring cart state on page reloads and preventing user data loss during user browsing sessions. The folder has a type.ts file, which shapes the type or structure of items in the cart, and it is exported to be used in the Redux function and components.

App.tsx allows users to view and access the navbar, cart, home, orderHistory, and AdminProductManager components after they log in successfully. And use this code <Route path="*" element={<Navigate to="/login" />} /> to direct unthorized users to log in page. 

The firebaseConfig.ts is helping to export Firestore, the database(db), and Authentication(auth) services to be used by the application.

Main.tsx is using <React.StrictMode> to find bugs and enforcing best practices during development of the app, <Provider store={store}> to make the redux store available to all components in the app, <QueryClientProvider client={queryClient}> to allow the availability of React Query in the whole app, and <BrowserRouter> for routing using browserhistory(navigation from one page to another without reloading the page).

# Source code
1.https://youtu.be/PngrpszT3aY?si=osBqDeZ9vnJhqnrc
2.https://firebase.google.com/docs/auth/web/start
3.https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
4.https://firebase.google.com/docs/firestore
5.https://youtu.be/vAoB4VbhRzM?si=DUrThUgDSPSqKWG0
6.https://firebase.google.com/?utm_source=google&utm_medium=cpc&utm_campaign=brand_sem&utm_content=na_us&gclsrc=aw.ds&gad_source=1&gad_campaignid=12211052842&gbraid=0AAAAADpUDOguOAjGH0TS2tPoO-XBOkiD5&gclid=EAIaIQobChMInIiv_Yq5jgMVYFR_AB2-UQE6EAAYASAAEgLgg_D_BwE





