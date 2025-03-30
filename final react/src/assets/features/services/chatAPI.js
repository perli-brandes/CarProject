import axios from "axios";

export const getChatAPI= async() =>{
    return await axios.get('http://localhost:8080/api/chat/getChats')

}



export const addChatAPI= async(chat) =>{
    return await axios.post(' http://localhost:8080/api/chat/addChat',chat)

    
}

export const deleteChatAPI= async(chatId) =>{
    return await axios.delete(`http://localhost:8080/api/chat/deleteChat/${chatId}`)
    
}

