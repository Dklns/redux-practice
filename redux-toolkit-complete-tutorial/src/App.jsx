import PostsList from "./features/posts/PostsList"
import AddPostForm from "./features/posts/AddPostForm"

const App = () => {
  return (
      <main className="app">
        <AddPostForm />
        <PostsList />
      </main>
  )
}

export default App;