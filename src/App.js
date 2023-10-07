import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [chosenId, setChosenId] = useState(null);
  const [formText, setFormText] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handlePostFormChange = (e) => {
    const { name, value } = e.target;
    setFormText((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const turnEditOn = (title, body, id) => {
    console.log(title, body);
    setChosenId(id);
    setFormText({ title, body });
  };

  const editPost = (e) => {
    e.preventDefault();
    if (formText.title < 1 || formText.body < 1) return;
    setPosts((prevPost) =>
      prevPost.map((post) =>
        post.id === chosenId
          ? { ...post, title: formText.title, body: formText.body }
          : post
      )
    );
    setFormText({ title: "", body: "" });
    setChosenId(null);
  };

  const deletePost = (id) => {
    setPosts((prevPost) => prevPost.filter((post) => post.id !== id));
  };
  return (
    <div className="App">
      <h1>Welcome to Text editor</h1>
      {posts.map((post) => (
        <div
          style={{ border: "1px dashed", marginBottom: "5px" }}
          key={post.id}
        >
          {chosenId === post.id && (
            <form onSubmit={editPost}>
              <input
                type="text"
                name="title"
                value={formText.title}
                onChange={handlePostFormChange}
              />{" "}
              <br />
              <textarea
                name="body"
                id=""
                cols="30"
                rows="10"
                value={formText.body}
                onChange={handlePostFormChange}
              ></textarea>{" "}
              <br />
              <button onClick={editPost}>change</button>
            </form>
          )}
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => turnEditOn(post.title, post.body, post.id)}>
            Edit
          </button>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
