import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
// import People from './people';

const Home = () => {
const [people, setPeople] = useState([]);  
const [offers, setOffer] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/request/data')
    .then(response => setPeople(response.data))
    .catch(err => console.log(err)) 
  }, [])

  useEffect(() => {
    axios.get('http://localhost:4000/offer/data')
    .then(response => setOffer(response.data))
    .catch(err => console.log(err)) 
  }, [])


    return (
        <>
        <Navbar/>
      <Hero title="Covid Help Nepal" desc="A live portal to offer and get help for Covid-19 patients"/>
      <div className="container my-5">
        <h2>Live Help Requests List</h2>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Bed Type</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              people.map((person, index) => {
                return (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{person.name}</td>
                  <td>{person.category}</td>
                  <td>{person.address}</td>
                  <td>{person.contactNumber}</td>
                  <td><button className="btn btn-primary"><Link className="text-light offerBtn" to={{pathname: `/req-details/${person._id}`}}>View Request</Link></button></td>
                  {/* <a href="/offer-help" className="text-light offerBtn"></a> */}
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>


      <div className="container my-5">
        <h2>Live Help Offers List</h2>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Help Offer Type</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              offers.map((offer, index) => {
                return (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{offer.name}</td>
                  <td>{offer.category}</td>
                  <td>{offer.address}</td>
                  <td>{offer.contactNumber}</td>
                  <td><button className="btn btn-primary"><Link to={{pathname: `/offer-details/${offer._id}`}} className="text-light offerBtn">View Offer</Link></button></td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <Footer/>
        </>
    )
}

export default Home;