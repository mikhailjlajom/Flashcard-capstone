import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import { listDecks, deleteDeck } from "../utils/api"

function Home() {
const history = useHistory()
const [decks, setDecks] = useState([])

function deleteHandler(deck) {
return deleteDeck(deck.id)
}

useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController()
        try {
            const deckResponse = await listDecks(abortController.signal)
            console.log("data here", deckResponse)
            setDecks(deckResponse)
        } catch (error) {
            console.log("Something went wrong", error)
        } return () => {
            abortController.abort()
        }
    }
    fetchData()
}, [])

return (
    <div className="container">
        <Link to="/decks/new" className="btn btn-secondary my-2">Create Deck</Link>
        <div className="card-deck">
            {decks.map((deck) => {
                return (
                    <div className="card" key={deck.id}>
                    <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-text">{deck.description}</p> 
                    <div className="d-flex">
                    <Link className="btn btn-secondary mr-1"> View</Link>
                    <Link className="btn btn-primary mx-1">Study</Link>
                    <Link onClick={deleteHandler(deck)} className="btn btn-danger ml-auto" >Delete</Link>
                    </div>
                    </div>
                </div>
                )
            })}

        </div>
    </div>
    
)

}

export default Home