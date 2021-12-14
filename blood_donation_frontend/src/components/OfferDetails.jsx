import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar'
import Footer from './Footer'


const OfferDetails = (props) => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [alldetails, setAllDetails] = useState({});

    useEffect(() => {

        const config = {
            params: {
                _id: localStorage.getItem('_id')
            }
        }
        // console.log(config.params._id)
        setUser(config.params._id);

    axios.get(`http://localhost:4000/offer/data/${id}`)
        .then(response => {
           setAllDetails(response.data);
        })
        .catch(err => console.log(err))      
    }, [])


    // console.log(alldetails);

    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    const handleDelete = (e) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`http://localhost:4000/offer/${id}`, config).then((res) => {
                console.log(res.data);
                props.history.push('/');
                
            }).catch((error) => {
                console.log(error)
            })
    }

    
    return (
        <>
            <Navbar/>
            <div className="container my-5">
                <p>Note: If the offer matches with your requirements, contact the offer provider and get help ASAP.</p>

                <h2>Category: {alldetails.category}</h2>
                <p>Name: {alldetails.name}</p>
                <h4 className="strong">Contact Details</h4 >
                <p>Email: {alldetails.email}</p>
                <p>Phone Number: {alldetails.contactNumber}</p>
                <h4>Details:</h4>
                <p>{alldetails.details}</p>
                <button className="btn btn-primary"><Link to="/get-help" className="text-light">Request Help</Link></button>
                {
                    (user) && (
                        <div className='my-3'>
                            <button className='btn btn-secondary'>
                                <Link to={{pathname: `/offer-update/${alldetails._id}`}} className="text-light">Edit</Link></button>
                            <button className='btn btn-danger mx-3'onClick={handleDelete}>Delete</button>
                        </div>
                    )
                }
            </div>
            <Footer/> 
        </>   
    )
}

export default OfferDetails; 