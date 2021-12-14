import {useState} from 'react';
import Navbar from "./Navbar";
import Hero from './Hero'
import Footer from "./Footer";
import axios from 'axios';


const GetHelp = (props) => {    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [value, setValue] = useState();
    const [details, setDetails] = useState("");

    const helpDesc="What help do you need?";  

    // const handleClick = e => {
    //     e.preventDefault();
    //     const data = { email,
    //         name,
    //         contactNumber: phoneNum,
    //         category: value,
    //         details  }

    //     const config = {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token')
    //         }
    //     }

    //     axios.post(`http://localhost:4000/request`, data, config).then((res) => {
    //         if (res.data.errorMessage) {
    //             return console.log(res.data.errorMessage);
    //         }
    //         console.log(res.data, "Request saved in DB")
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    //     // console.log(title, body)
    //     props.history.push('/');


    // }

    const handleClick = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/request', {
            email,
            name,
            contactNumber: phoneNum,
            category: value,
            details            
        })
        .then(response => {
            console.log(response);
            props.history.push('/')
        })
        .catch(err => console.log(err))        
    }
    return (
        <>
        <Navbar/>
        <Hero title="Get Help" desc="Need help for yourself or someone you know? Fill the form below and someone will contact you."/>
        <form className="container my-3">
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" className="form-control" id="fullName" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="getHelpFor">{helpDesc}</label>
                    <select className="form-select" value={value}
      onChange={e => setValue(e.currentTarget.value)}>
                        <option defaultValue>Select one of service</option>
                        <option value="oxygen">Oxygen</option>
                        <option value="bed">Hospital Bed</option>
                        <option value="ambulance">Ambulance</option>
                        <option value="medicine">Medicine</option>
                        <option value="plasma">Plasma</option>
                    </select>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="details">Other Details</label>
                    <textarea className="form-control" id="details" rows="4" value={details} onChange={e => setDetails(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        <Footer/>
        </>
    )
}

export default GetHelp;