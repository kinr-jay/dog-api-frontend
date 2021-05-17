import React, { useState } from "react"
import "./App.css"
import { Route, Link, Switch } from "react-router-dom"
import Display from "./Display"
import Form from "./Form"


function App() {
  const url = "https://kinr-dog-api.herokuapp.com"
  
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }

  const [dogs, setDogs] = useState([])
  const [selectedDog, setSelectedDog] = useState(emptyDog)
  
  const getDogs = () => {
    fetch(url + "/dog")
      .then((response) => response.json())
      .then((data) => {
        setDogs(data)
      })
  }
  
  React.useEffect(() => getDogs(), [])

  const selectDog = (dog) => {
    setSelectedDog(dog)
  }

  const handleCreate = (newDog) => {
    fetch(url + "/dog", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDog)
    }).then(() => {
      getDogs()
    })
  }

  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dog)
    }).then(() => {getDogs()})
  }

  const handleDelete = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    }).then(() => {
      getDogs()
    })
  }
  
  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <main>
        <Link to="/create">
          <button>Add Dog</button>
        </Link>
        <Switch>
          <Route exact path="/" render={(rp) => (
          <Display {...rp} dogs={dogs} selectDog={selectDog} handleDelete={handleDelete}/>)} />
          <Route
            exact path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  )
}

export default App
