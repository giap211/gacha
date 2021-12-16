import './App.css';
import {fiveStars, fourStars, threeStars} from './Characters.js';

function Inventory() {
    const values = [fiveStars, fourStars, threeStars];
    var arr1 = [];
    var arr2 = [];
    for(var x = 0; x < values.length; x++){
        for(var i = 0; i < Object.keys(values[x]).length; i++){
            var test = Object.values(values[x])[i];
            if(test!== 0){
                arr1.push(Object.keys(values[x])[i]);
                arr2.push(Object.values(values[x])[i]);
            }
        }
    }
    return(
        <table className='table'>
            <tbody>
                <th className='table'>
                {arr1.map(function (itemName, index) {
                    return <tr key={index} >
                        {itemName}
                    </tr>;
                })}
                </th>

                <th className='table'>
                {arr2.map(function (itemNumber, index) {
                    return <tr key={index} >
                        {itemNumber}
                    </tr>;
                })}
                </th>
            </tbody>
        </table>
    )
}

export default Inventory;