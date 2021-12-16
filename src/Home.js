import './App.css';
import {fiveStars, fourStars, threeStars, threeStarImages, fourStarImages, fiveStarImages} from './Characters.js';
import{useState} from 'react';

function Home() {
  const [counter, setCounter] = useState(0);
  const [characterNames, setCharacterNames] = useState([]);
  const [imgPool, setImgPool] = useState([]);
  function getRandom(max){
    return(
      Math.floor(Math.random() * max)
    )
  }

  function getSummon(props){
    setCounter(counter + props);
    setCharacterNames([]);
    setImgPool([]);
    for(var x = 0; x < props; x++){
      var result = getRandom(100);
      var charArr = [];
      if(result < 80){
        charArr = Object.values(threeStarImages);
        var value = 'three';
        
      }
      else if (result > 79 && result < 95){
        charArr = Object.values(fourStarImages);
        value = 'four';
        
      }
      else if (result > 94){
        charArr = Object.values(fiveStarImages);
        value = 'five'; 
      }
      let charHash = new Map();
      charHash.set('three', threeStars);
      charHash.set('four', fourStars);
      charHash.set('five', fiveStars);
      getCharacter(charArr, charHash, value);
    }
  }

  function getCharacter(charArr, charHash, value){
    var random = getRandom(charArr.length);   
    var num = Object.keys(charHash.get(value))[random];
    setCharacterNames(characterNames => [...characterNames, num + ' | '])
    charHash.get(value)[num]++;
    let hashmap = new Map();
    for(let x = 0; x < charArr.length; x++){
      hashmap.set(Object.keys(charHash.get(value))[x], {src: charArr[x]});
    };
    const arr = Object.keys(charHash.get(value)).map(character => hashmap.get(character));
    setImgPool(imgPool => [...imgPool, arr[random]]);
  }

  return (
    <div>
      <h1 className='text'> Genshin Wish Simulator </h1>
      <div className="container">

        {imgPool.map(function (imgSrc, index) {
          return <img className="size" src={imgSrc.src} key={index} alt="" />;
        })}
      </div>
      <br/>
      <div className='buttons' padding-top='10px'>
        <button className='buttons' onClick={() => getSummon(1)}> Single Summon </button>
        <button className='buttons' onClick={() => getSummon(10)}> Ten Summon </button>
      </div>
      <h2 className='text'>
        {" "}
        {"Pulls:"} {characterNames}{" "}
      </h2>
      <h2 className='text'> Total Summons: {counter} </h2>
    </div>
  );
}
export default Home;
