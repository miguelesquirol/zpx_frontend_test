import React, { Component } from 'react';
import classes from './GameDetails.css'
import ReactHtmlParser from 'react-html-parser';


class GameDetails extends Component {

  componentWillMount() {
    this.setState({ steam_appid: this.state.steam_appid });
    fetch('https://zpx-codetest.herokuapp.com/api/v1/stats/steam/reviews?offset=0&setSize=10&ascending=true&returnCount=false&filterByField=steam_appid&filterValue='+this.state.steam_appid)
    .then(response => response.json())
    .then(data => this.setState({ data }));
    
  }
 

  fetchData = (event) =>  {
    
    fetch('https://zpx-codetest.herokuapp.com/api/v1/stats/steam/reviews?offset='+this.state.offset+'&setSize=10&ascending=true&returnCount=false&filterByField=steam_appid&filterValue='+this.state.steam_appid)
        .then(response => response.json())
        .then(data => this.setState({ data }))
  }
        

  nextOffset = (event) => {
    this.setState({
        offset:  this.state.data.nextOffset
    })
    

    this.timer = setTimeout(() => this.fetchData(), 1000);


}


  render() {


    function Reviews(props) {
 
      if (props.reviews) {

     
        const reviewlist = Object.values(props.reviews.data)     
       
        const listItems = reviewlist.map((review) =>

        <div key={`review-${review.id}`} className={classes.Review}>
        { ReactHtmlParser(review.review_text) }

          <ul className={classes.ReviewInfo} >            
            <li><strong>Date Posted:</strong> {review.date_posted}</li>
            <li><strong>Hours Player:</strong> {review.hours_played}</li>
            <li><strong>Language:</strong> {review.lang_key}</li>
            <li><strong>Number of Games Owned:</strong> {review.owned_games_amount}</li>
            <li><strong>Recieved Compensation:</strong> {review.received_compensation}</li>
            <li><strong>Recomended?:</strong> {review.recommended}</li>
          </ul>
        </div>

        );
        return (
          <div className={classes.ReviewsWrapper}>{listItems}</div>
        );

        
  
       
      }
      else {
        return ( 
        <p>Nothing to see</p>
        )
      }
    }
  

    const { title, id, steam_appid } = this.props.location.state
 

    return (
      <div>
        <div className={classes.Game}>
          <h1>{title}</h1>
          <a href={ 'https://store.steampowered.com/app/' + {steam_appid} } target="_blank" className={classes.externalLink}>Steam Link</a>
        </div>

        <div className={classes.Reviews}>
          
          <h2>Reviews</h2>    
            <Reviews reviews = {this.state.data} />
            <button className={classes.Button} onClick={this.nextOffset} >
                Next
            </button>

        </div>

      </div>
    )

  }


  constructor(props) {
    super(props);
 
    this.state = {
      startDate: new Date(),
      endDate:  new Date(),
      data: null,
      offset: 0,
      steam_appid: this.props.location.state.steam_appid
    };
  }

}



export default GameDetails