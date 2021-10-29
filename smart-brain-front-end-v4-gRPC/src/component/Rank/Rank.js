import React from "react";

// const Rank = () => {
const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='black f3'>
                {/* {'Joeban, your current rank of useage is...'} */}
                {/* {`${name}, your current rank of useage is...`} */}
                {`${name}, your current entry count is...`}
            </div>
            <div className='black f1'>
                {/* {'#5'} */}
                {entries}
            </div>
        </div>
    )
}

export default Rank;