import React from 'react';
import StarFillIcon from 'remixicon-react/StarFillIcon'
import StarLineIcon from 'remixicon-react/StarLineIcon'

function Star({num, size = 20}) {
    return (
        <>
            {
                [...Array(5).keys()].map((item, index) => {
                    if(item < num) {
                        return (
                            <StarFillIcon key={index} size={size} />
                        )
                    } else {
                        return (
                            <StarLineIcon key={index} size={size} />
                        )
                    }
                })
            }
        </>
    );
}

export default Star;
