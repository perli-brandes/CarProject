import axios from "axios";

export const getMessageAPI= async() =>{
    return await axios.get('http://localhost:8080/api/message/getMessages')

}



export const addMessageAPI= async(message) =>{
    console.log("message:",message)
   
    return await axios.post(' http://localhost:8080/api/message/addMessage',message)



    
}

export const deleteMessageAPI= async(messageId) =>{
    console.log("messageId",messageId);
    return await axios.delete(`http://localhost:8080/api/message/deleteMessage/${messageId}`)
    
}
export const updateMessageAPI= async(m,messageId) =>{
    return await axios.put(`http://localhost:8080/api/message/updateMessage/${messageId}`,m)
    
}
