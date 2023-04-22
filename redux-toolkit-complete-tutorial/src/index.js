import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';
import PostsList from "./features/posts/PostsList"
import AddPostForm from "./features/posts/AddPostForm"
import SinglePostPage from './features/posts/SinglePostPage';

store.dispatch(fetchUsers());

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PostsList />
      },
      {
        path: '/post',
        children: [
          {
            index: true,
            element: <AddPostForm />
          },
          {
            path: ':postId',
            element: <SinglePostPage />
          }
        ]
      }
    ]
  }
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
