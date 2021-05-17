import React from "react";

const Display = ({ dogs, selectDog, handleDelete, history }) => {
  const loading = () => {
    return <h1>Loading...</h1>
  }

  const loaded = () => {
    return (
      <div style={{ textAlign: "center" }}>
        {dogs.map((dog, index) => (
          <article key={index}>
            <img src={dog.img} alt="" />
            <h1>{dog.name}</h1>
            <h3>{dog.age}</h3>
            <button
              onClick={() => {
                selectDog(dog)
                history.push("/edit")
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete(dog)
              }}
            >
              Delete
            </button>
          </article>
        ))}
      </div>
    )
  }
  return dogs ? loaded() : loading()
}

export default Display;
