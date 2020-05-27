import React from 'react';

import Aux from '../../hoc/_Aux'



const layout = ( props ) => (

    <Aux>
        <main>
            {props.children}
        </main>
    </Aux>
)

export default layout;