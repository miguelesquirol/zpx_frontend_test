import React from 'react';
import { Link } from 'react-router-dom'
import classes from './Games.css'

const Games = (props) => {

  return (


    <div>

      {props.gameslist ? props.gameslist.map(game => {
          return (

            <div key={`games-${game.id}`} className={classes.Game}>
              <Link  
              to={{
                pathname: '/Games/' + game.id + '',
                state: {
                  title: game.display_name,
                  id: game.id,
                  steam_appid: game.steam_appid
                }
              }}              >
                <h2>{game.display_name} </h2>

              </Link>

              <a href={ 'https://store.steampowered.com/app/' + game.steam_appid } target="_blank" className={classes.externalLink}>Steam Link</a>


            </div>
          )
        })
        : null}

    </div>
  )
};

export default Games