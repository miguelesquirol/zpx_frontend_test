import React, { Component } from 'react';
//
import Layout from './components/Layout/Layout'
// import Search from './containers/Search/Search'
// import SearchResult from './containers/SearchResult/SearchResult'
import Games from './components/Games/Games'
import DataAnalysis from './components/DataAnalysis/DataAnalysis'

import classes from './App.css'

class App extends Component {


  componentWillMount() {
    this.setState({ steam_appid: this.state.steam_appid });
    fetch(`https://zpx-codetest.herokuapp.com/api/v1/stats/steam/game?offset=${this.state.offset}&setSize=${this.state.size}&ascending=true&returnCount=false`)
    .then(response => response.json())
    .then(data => this.setState({
                    games: data
                 }));
    
  }


    searchChangeHandler = (event) => {
    this.setState({input: event.target.value})
    }


    nextOffset = (event) => {
        this.setState({
            prevOffset: this.state.offset,
            offset:  this.state.games.nextOffset
        })

        this.timer = setTimeout(() => this.fetchData(), 1000);

    }


    prevOffset = (event) => {
      this.setState({
          offset:  this.state.prevOffset,
      })

      this.timer = setTimeout(() => this.fetchData(), 1000);

  }

    searchClickHandler = (event) => {
      this.setState({
          search:  "Searching " + this.state.input
      })
  }


    fetchData = (event) =>  {
        fetch(`https://zpx-codetest.herokuapp.com/api/v1/stats/steam/game?offset=${this.state.offset}&setSize=${this.state.size}&ascending=true&returnCount=false`)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    games: data
                 })
            })
                 .catch(console.log)
            }


      render() {
        return (

          <Layout>
                      
            <div  className={classes.GameWraper}>

              <h2 className={classes.Title}>List of Games</h2>
              <Games gameslist={this.state.games.data}/>
              
              <div class={classes.Buttons}>
                <button className={classes.Button} onClick={this.prevOffset} >
                  Preview Page
                </button>
                <button className={classes.Button} onClick={this.nextOffset} >
                  Next Pate
                </button>
              </div>
            </div>

            <DataAnalysis/>

          </Layout>

        )
      }


    constructor() {
        super();
        this.state = { 
          games: [],
          nextOffset: 0,
          prevOffset: 0,
          size : 4,
          offset: 0
        };
    }

}

export default App;
