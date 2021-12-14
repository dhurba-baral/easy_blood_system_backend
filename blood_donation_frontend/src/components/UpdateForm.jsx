import {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom'
import Navbar from "./Navbar";
import Hero from './Hero'
import Footer from "./Footer";
import axios from 'axios';


const UpdateDetails = props => {  
    // const [user, setUser] = useState(null);

    // const {category, contactNumber, details, email, name, _id} = props.location.updateProps;
    const [alldetails, setAllDetails] = useState({});
    const {id} = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [value, setValue] = useState();
    const [details, setDetails] = useState("");
      
    const helpDesc = "Updating the details";

    useEffect(() => {

        // const config = {
        //     params: {
        //         _id: localStorage.getItem('_id')
        //     }
        // }
        // console.log(config.params._id)
        // setUser(config.params._id);

        axios.get(`http://localhost:4000/request/data/${id}`)
        .then(response => {
            setAllDetails(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
            setPhoneNum(response.data.contactNumber);
            setValue(response.data.category);
            setDetails(response.data.details);
        })
        .catch(err => console.log(err))      
    }, [])


    const handleClick = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:4000/request/${id}`, {
            email,
            name,
            contactNumber: phoneNum,
            category: value,
            details 
        }).then((res) => {
            console.log(res.data)
            props.history.push('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <>
            <Navbar/>
            <Hero title="Update" desc="Updating the details"/>
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
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Update</button>
            </form>            
            <Footer/>
        </>
    )
}

export default UpdateDetails;