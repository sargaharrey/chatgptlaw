

import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "react-pro-sidebar";
import { Img, Input, Text } from "components";
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
const { v4: uuidv4 } = require('uuid');

const TVTwoPage = () => {

  const [chatHistory, setChatHistory] = useState([]);
  const [chatParents, setChatParents] = useState([]);
  const [question, setQuestion] = useState("");
  const input = useRef(null);
   const [parentId,setParentId] = useState('')
  const user1 = useSelector(state => state.user);
  const [user, setUser] = useState(user1.login.user.user);

  useEffect(() => {
    fetchChatParents();


    console.log(chatHistory)
  }, []);

  

  const fetchChatParents = async () => {
    try {
      const response = await axios.get("http://localhost:5001/chatParents", {
        params: { userId: user },
      });
      setChatParents([...chatParents,response.data]);
      // console.log(chatParents)
    } catch (error) {
      console.error(error);
    }
  };


  const handleChatParentClick = async (chatParentId) => {
    // fetchChatRows()
    try {
      const response = await axios.get("http://localhost:5001/chatRows", {
        params: { userId: user, chatParent: chatParentId },
      });
      
      setParentId(chatParentId._id)
      setChatHistory([])
      setChatHistory([response.data.chatParent.chatRows]);
      // console.log(chatHistory)
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const question = input.current.value;
    setQuestion(question);
    try {
      // console.log(chatHistory, chatParents, chatParents[0][chatParents.length - 1]._id, user)
      const response = await axios.post('http://127.0.0.1:8000/chat', { "message": question });
     await axios.post("http://localhost:5001/addChatRow", {
       chatParent: parentId,
        userId: user,
        question: question,
        answer: response.data.response
      });
      const newChat = { question: question, answer: response.data.response, _id: chatParents[0][chatParents.length - 1]._id };
      console.log(parentId)
   
       setChatHistory( [...chatHistory, [newChat]]);
      console.log(newChat)
      setQuestion("");
    } catch (error) {
      console.error(error);
    }
    console.log(chatHistory)
  };


  const handleAddChat = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/addChatParent", {
        userId: user,
        
      });
  
      const newChatParentId = response.data.chatParentId;
      console.log(response.data)
      setParentId(newChatParentId)
      setChatParents([...chatParents, []]);
      setChatHistory([])
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <div className="bg-white-A700 flex flex-row font-poppins items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <Sidebar className="!sticky !w-[265px] bg-gray-900 flex h-screen md:hidden lg:flex justify-start overflow-auto md:px-5 top-[0]">
          <div className="flex flex-row gap-5 items-center justify-between mb-[30px] mt-2.5 mx-auto w-[234px]">
            <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
              <Img
                className="h-[29px] w-7"
                src="images/img_trash.svg"
                alt="trash"
              />
              <Text
                className="capitalize text-base text-red-200 w-[72px]"
                size="txtPoppinsBold16"
              >
                LawCore
              </Text>
            </div>
            <Img
              className="h-6 w-6"
              src="images/img_jammenu.svg"
              alt="jammenu"
            />
          </div>
          <div className="flex flex-col gap-5 items-start justify-start mb-[50px] mt-[20px] px-4 mx-auto w-full">
            <div className="flex flex-col items-start mx-auto justify-start w-full flex">
              <form className="flex flex-col">
                <button
                  type={'submit'}
                  onClick={handleAddChat}
                  className="bg-white-A700 text-gray-900_cc flex mb-4 py-2 px-16 mx-auto w-full shadow"
                >
                  <span className="text-gray-900_cc">Add Chat</span>
                  <span className="text-gray-900_cc"> +</span>
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-[25px] items-start justify-start w-auto">
              <div className="flex flex-col items-start justify-start w-auto">
                <div className="flex flex-col gap-[15px] items-start justify-start w-auto">
                  <div className="flex flex-col items-start justify-start w-auto">
                    <Text
                      className="capitalize text-[10px] text-red-200 "
                      size="txtPoppinsBold8"
                    >
                      Today
                    </Text>
                  </div>
                  <div className="flex flex-col items-start justify-start w-auto">
                    <div className="flex flex-col gap-[15px] items-start justify-start w-auto">
                      {chatParents &&
                        chatParents.map(item => item.filter(item => item && item.chatRows && item.chatRows.length > 0)
                          .map((chatParent, index) =>
                            chatParent.chatRows.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex flex-row gap-[7px] items-center justify-center w-auto cursor-pointer"  
                                onClick={() => handleChatParentClick(chatParent)}
                              >
                                <Img
                                  className="h-3.5 w-4"
                                  src="images/img_computer.svg"
                                  alt={`computer_${index}`}
                                />
                                <Text
                                  className="capitalize text-base text-white-A700 w-[39px]"
                                  size="txtPoppinsRegular16"
                                >
                                  {item.question}
                             
                                </Text>
                              </div>
                            ))
                          ))}



                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-auto">
                <div className="flex flex-col gap-[15px] items-start justify-start w-auto">
                  <div className="flex flex-col items-start justify-start w-auto">
                    <Text
                      className="capitalize text-[10px] text-red-200 "
                      size="txtPoppinsBold8"
                    >
                      Last week
                    </Text>
                  </div>
                  <div className="flex flex-col items-start justify-start w-auto">
                    <div className="flex flex-col gap-[15px] items-start justify-start w-auto">
                      {chatParents &&
                        chatParents.map(item => item.filter(item => item && item.chatRows && item.chatRows.length > 0)
                          .map((chatParent, index) =>
                            chatParent.chatRows.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex flex-row gap-[7px] items-center justify-center w-auto cursor-pointer"
                                onClick={() => handleChatParentClick(chatParent)}
                              >
                                <Img
                                  className="h-3.5 w-4"
                                  src="images/img_computer.svg"
                                  alt={`computer_${index}`}
                                />
                                <Text
                                  className="capitalize text-base text-white-A700 w-[39px]"
                                  size="txtPoppinsRegular16"
                                >
                                  {item.question}

                                </Text>
                              </div>
                            ))
                          ))}

                      
                        

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
        <div className="flex flex-col gap-10 items-start justify-start w-full px-5 w-[1056px]">
          <div className="flex justify-between items-center gap-5 w-full h-16">
            <div className="flex items-center gap-2.5 w-full py-5">
              <img
                className="h-10 w-10 rounded-full"
                src="https://via.placeholder.com/100"
                alt="User"
              />
              <div className="flex flex-col gap-1 items-start">
                <p className="text-base text-gray-900 lowercase">Username</p>
                <a className="text-xs cursor-pointer flex items-center gap-1">
                  <span>signout</span>
                  <img
                    className="h-2.5 ml-1.5 mt-0.5 mb-1"
                    src="https://via.placeholder.com/12"
                    alt="Logout"
                  />
                </a>
              </div>
            </div>
            <img
              className="h-6 w-6"
              src="https://via.placeholder.com/24"
              alt="Logo"
            />
          </div>
          <div className="flex flex-col items-left justify-end h-full w-full pb-2">
            <div className="chat-history overflow-auto">

                {chatHistory[0] && chatHistory.filter(item => item.length > 0).map((chat, index) => (
               
                  <div key={index} className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://via.placeholder.com/32"
                        alt="User"
                      />
                      <p className="bg-blue-200 rounded p-2">{chat[0].question}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://via.placeholder.com/32"
                        alt="Chat"
                      />
                      <p className="bg-green-200 rounded p-2">{chat[0].answer}</p>
                      {console.log(chat)}
                    </div>
                  </div>
                ))} 
            </div>
            <form className="flex flex-col w-full mt-4">
              <div className="flex items-center bg-white border border-blue-200 rounded p-2">
                <input
                  name="frameTwo"
                  placeholder="Send Message"
                  className="flex-grow text-sm text-gray-400 placeholder-gray-400"
                  ref={input}
                />
                <button
                  type="submit"
                  onClick={handleQuestionSubmit}
                  className="h-11 ml-3 bg-red-200 rounded cursor-pointer"
                >
                  <img
                    className="h-6 w-6"
                    src="https://via.placeholder.com/24"
                    alt="Send"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

};
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

// const mapDispatchToProps = {
//   loginSuccess,
//   loginFail
// };
export default connect(mapStateToProps, null)(TVTwoPage);

