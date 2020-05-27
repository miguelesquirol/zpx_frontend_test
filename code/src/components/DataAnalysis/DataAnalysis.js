import React, { Component } from 'react';
import classes from './DataAnalysis.css'
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import PieChartData from "../PieChart/PieChart"
import ReviewTime from "../ReviewTime/ReviewTime"

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DataAnalysis extends Component {

    componentWillMount() {


        this.setState({
            startDate: this.state.startDate,
            endDate: this.state.startDate
        });
    }

    fetchData = (event) => {
        var startDateFormated = format(this.state.startDate, "yyyy-MM-dd");
        var endDateFormated = format(this.state.endDate, "yyyy-MM-dd");

        fetch('https://zpx-codetest.herokuapp.com/api/v1/stats/steam/reviews?offset=0&setSize=500&sort=date_posted&ascending=false&returnCount=false&filterByField=date_posted&filterFrom=' + startDateFormated + '&filterTo=' + endDateFormated)
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }




    handleChangeStartDate = date => {
        this.setState({
            startDate: date
        });
    };

    handleChangeEndDate = date => {

        this.setState({
            endDate: date
        });
    };



    render() {



        function compressArray(original) {

            var compressed = [];
            var copy = original.slice(0);
            for (var i = 0; i < original.length; i++) {

                var myCount = 0;
                for (var w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        myCount++;
                        delete copy[w];
                    }
                }

                if (myCount > 0) {
                    var a = new Object();
                    a.date = original[i];
                    a.a = myCount;
                    compressed.push(a);
                }
            }

            return compressed;
        };


        function average(arr) {
            console.log(arr)
            if (arr.length > 0){
                const sum = arr.reduce((sum, val) => (sum += val));
                const len = arr.length;

                return sum / len;
            }
            else {
                return 0;
            }
        }

        const Data = props => {
            let reviewNumber, positive, negative
            if (props.reviews) {
                const reviewlist = Object.values(props.reviews.data)
                reviewNumber = reviewlist.length;
                var newstring = [];
                var hours = []
                var gamenumber = [];
                var reviewlistnew = [...reviewlist]
                reviewlistnew.map(sweetItem => {

                    var hours_played = sweetItem.hours_played
                    var owned_games_amount = sweetItem.owned_games_amount;

                    hours.push(hours_played)
                    gamenumber.push(owned_games_amount)

                    var date = sweetItem.date_posted

                    var newdate = format(
                        new Date(date),
                        'yyyy-MM-dd'
                    )

                    newstring.push(newdate)

                })


                var newArray = compressArray(newstring);

                positive = reviewlist.filter((obj) => obj.recommended === 1).length;
                negative = reviewlist.filter((obj) => obj.recommended === 0).length;
                
                var averagehours = average(hours);
                var averagegames = average(gamenumber);


                return (
                    <div className={classes.Data}>
                        <div className={classes.Data1}>
                            <div className={classes.Reviews}>
                                <h2>{reviewNumber}</h2>
                                <p>Number of reviews</p>
                            </div>
                            <div className={classes.PvN}>
                                <div><h3>{positive}</h3>Positive Reviews</div>
                                <div><h3>{negative}</h3>Negative Reviews</div>
                            </div>

                            <div className={classes.PvN}>
                                <div><h3>{Math.round(averagehours)}</h3>Average Hours Played</div>
                                <div><h3>{Math.round(averagegames)}</h3>Average Games Owned</div>
                            </div>



                        </div>

                        <div className={classes.Data2}>
                            <h4>Positive vs Negative Reviews</h4>
                            <PieChartData positive={positive} negative={negative} />
                        </div>

                        <div className={classes.Data3}>
                            <h4>Number of cases vs time</h4>
                            <ReviewTime data={newArray} />
                        </div>
                    </div>
                )

            }

            else {

                return (
                    <h2 className={classes.Nothingtosee}>Nothing to see... Please pick a date range</h2>
                )
            }
        }



        return (
            <div>
                <div className={classes.Details}>
                    <h3>Data Analysis</h3>

                    <div className={classes.Filter}>
                        <div className={classes.From}>From
                    <DatePicker
                                showPopperArrow={false}
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.startDate}
                                onChange={this.handleChangeStartDate}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                            />
                        </div>
                        <div className={classes.From}>To
                    <DatePicker
                                showPopperArrow={false}
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.endDate}
                                onChange={this.handleChangeEndDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                minDate={this.state.startDate}
                            />
                        </div>

                        <button className={classes.Fetch} onClick={this.fetchData}>
                            Fetch Data
                    </button>

                    </div>


                    <Data reviews={this.state.data} startDate={this.state.startDate} endDate={this.state.endDate} />

                </div>

            </div>
        )

    }


    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            data: null,
        };
    }

}



export default DataAnalysis