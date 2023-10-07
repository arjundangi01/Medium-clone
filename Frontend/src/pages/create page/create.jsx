import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Navbar2 from "../../components/navbar/navbar2";
import axios from 'axios'
import Cookies from 'js-cookie';

const initialObj = {
  title: "",
  content: "",
  category: "",
  likeCounts: 0,
};
const Create = () => {
  const [blogObj, setBlogObj] = useState(initialObj);
  const [userToken,setUserToken] = useState(null)

  useEffect(  () => {
    // Access the cookie by name
    const userToken = Cookies.get('userToken');
 
    if (userToken) {
      setUserToken(userToken)
      // fetchUser(userToken)
      console.log('Value from cookie:', userToken);
    } else {
      console.log('Cookie not found');
    }
  }, []);
  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    // console.log(value,name)
    setBlogObj({ ...blogObj, [name]: value });
  };
  const onPublish = async() => {
    // console.log(blogObj)
    // await axios
    const headers = {
      'Authorization': `Bearer ${userToken}`, 
       
    };
    try {
      const newBlog = await axios.post('http://localhost:8080/blogs', blogObj, {
       headers:headers
     })
      window.location.assign('/')
      // console.log(newBlog)
    } catch (error) {
      
    }
    
    
  };
  return (
    <>
      <Navbar2 onPublish={onPublish} />
      <div className="mt-16 md:w-[80%] lg:w-[70%] m-auto w-[90%] ">
        <div className="flex mb-6 justify-between items-center">
          <input
            name="title"
            type="text"
            placeholder="Enter Title"
            className="focus:border-transparent focus:outline-none font-bold tracking-wider"
            onChange={handleChange}
          />
          <select
            name="category"
            id=""
            className="border-transparent "
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="economics">Economics</option>
          </select>
        </div>
        <div>
          <textarea
            name="content"
           
            className="border focus:outline-none focus:ring-0 text-justify px-2 w-full h-[100vh]  rounded " 
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Create;
