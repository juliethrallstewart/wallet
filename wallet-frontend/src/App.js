import React, {useEffect, useState} from 'react';

import './App.css';
import axios from 'axios';
import NewTransaction from './components/New_Transaction'

function App() {
  const [chain, setChain] = useState()

  const [received, setReceived] = useState({
    message: ''
  })

  const [sent, setSent] = useState()

  const [user, setUser] = useState({
    name: ''
  })

  useEffect(() => {
    axios.get('http://localhost:5000/chain')
      .then(res => {
        console.log(res.data)
        setChain(res.data)
        
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  useEffect(() => {
    let total_received = 0
    chain && chain.chain.map(item => {
      return item.transactions.map(t => {
        if (user.name) {
        if (t.recipient === user.name) {
          return total_received += t.amount
        }
      }})
    })
    setReceived(total_received)
  }, [chain, user, received])

  useEffect(() => {
    let total_sent = 0
    chain && chain.chain.map(item => {
      return item.transactions.map(t => {
        if (user.name) {
        if (t.recipient !== user.name) {
          return total_sent += t.amount
        }
      }})
    })
    setSent(total_sent)
  }, [chain, user, received])

  const getReceived = (status) => {
    
    setReceived(status)
  }
  // chain ? 
  // get_received() && get_sent() : console.log("waiting")

  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    console.log(user.name)
    
  
    
  }

  
	const handleChange = e => {
    setUser({user, [e.target.name]: e.target.value})
	};




  return (
    <div className="App">
      
 
        <NewTransaction getReceived={getReceived}/>
        <h1>Get User Profits</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
						<input
							type="text"
							name="name"
							className="form-group"
							placeholder="Name"
							onChange={handleChange}
							value={user.name}
						/>
					</div>
          <button>Submit</button>
        </form>
        <div>Coin Wallet</div>
        <div>{user.name} Total Received: {chain && received}</div>
        <div>Total Sent: {chain && sent}</div>
        <div>Profit: {chain && received - sent}</div>

    </div>
  )
  
}

export default App;
