import React, { useEffect, useState } from "react";
import axios from "axios";
import "./post.css";
function Home2() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const uid = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/message/${uid}`)
      .then((response) => setPosts(response.data))
      .catch((error) => {
        console.log(error, "Error in fetching tha database.");
      });
  }, []);

  const handleAddPost = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (event) => {
    axios
      .post(`http://localhost:5000/message/${uid}`, {
        title: title,
        description: description,
        image: image,
      })
      .then((response) => {
        setPosts([...posts, response.data.text]);
      })
      .catch((error) => {
        console.log('"Error in adding the text in the databae', error);
      });
    setShowForm(false);
  };

  const handleDelete = (postId, postIndex) => {
    axios
      .delete(`http://localhost:5000/message/${postId}`)
      .then((response) => {
        const updatedPosts = [...posts];
        updatedPosts.splice(postIndex, 1);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.log("Error in deleting the post from the database", error);
      });
  };

  return (
    <div className="flex flex-wrap">
      {posts.map((post, index) => (
        <div className="lg:w-1/3 sm:w-1/2 p-4 rounded-lg">
          <div className="flex relative">
            <img
              alt="gallery"
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
              src={post["image"]}
            />
            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100 rounded-lg">
              <h2 className="tracking-widest text-sm title-font font-medium text-indigo-400 mb-1">
                {post["title"]}
              </h2>
              {/* <h1 className="title-font text-lg font-medium text-white mb-3"></h1> */}
              <p className="leading-relaxed text-white">
                {post["description"]}
              </p>

              <button
                class="m-4 ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
                onClick={() => {
                  handleDelete(post["_id"], index);
                }}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home2;
