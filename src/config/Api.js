import axios from 'axios';

const getContacts = () =>{
    axios.get('https://simple-contact-crud.herokuapp.com/contact')
    .then(res =>{
        debugger
        return res
    })
}

export default {getContacts}