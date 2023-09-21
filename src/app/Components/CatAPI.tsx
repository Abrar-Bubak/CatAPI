'use client'
import React, { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const CatAPI = () => {
  const [cats, setCats] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');

  const getCats = () => {
    if (!name && !minWeight && !maxWeight) {
      alert('Enter at least one option');
      return;
    }

    setLoading(true);

    const apiUrl = `https://api.api-ninjas.com/v1/cats?name=${name}&min_weight=${minWeight}&min_height=${maxWeight}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: { 'X-Api-Key': '2TxDOe8rYvMgWif0ch0k3i4qRJof3R5PdEZOHNE8' },
    })
      .then(response => response.json())
      .then(data => {
        setCats(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
        
      });
  };

  return (
    <>
      <h1 className="text-5xl text-cyan-900 text-center font-semibold mb-4">Cat App</h1>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          className="w-2/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Min Weight"
          className="w-2/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800"
          onChange={e => setMinWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="Max Height"
          className="w-2/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800"
          onChange={e => setMaxWeight(e.target.value)}
        />
        <button
          type="button"
          className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => getCats()}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : cats.length > 0 ? (
        cats.map((cat, index) => (
          <section key={index}>
            <div className="flex">
              <div className="w-1/2">
                <img
                  className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
                  src={cat.image_link}
                  alt={cat.name + ' Image'}
                />
              </div>

              <div className="w-1/2 p-6">
                <h1 className="text-5xl text-cyan-900 text-center font-semibold mb-4">
                  {cat.name}
                </h1>

                <ul className="text-lg list-disc pl-6 mt-6">
                  <li className="mb-2">Length: {cat.length} </li>
                  <li className="mb-2">Origin: {cat.origin}</li>
                  <li className="mb-2">Family Friendly: {cat.family_friend}</li>
                  <li className="mb-2">Shedding: {cat.shedding}</li>
                  <li className="mb-2">General Health: {cat.general_health} </li>
                  <li className="mb-2">Playfulness: {cat.playfulness}</li>
                  <li className="mb-2">Children Friendly:{cat.children_friendly} </li>
                  <li className="mb-2">Grooming:{cat.grooming} </li>
                  <li className="mb-2">Intelligence:{cat.intelligence} </li>
                  <li className="mb-2">Other Pets Friendly:{cat.other_pets_friendly} </li>
                  <li className="mb-2">Min Weight: {cat.min_weight}</li>
                  <li className="mb-2">Max Weight: {cat.max_weight} </li>
                  <li className="mb-2">Min Life Expectancy:{cat.min_life_expectancy} </li>
                  <li>Max Life Expectancy:{cat.max_life_expectancy} </li>
                </ul>
              </div>
            </div>
          </section>
        ))
      ) : (
        <div className="flex items-center justify-center h-screen">
  <p className="text-2xl font-bold text-red-600">Could Not find data for the above information!</p>
</div>

      )}
    </>
  );
};

export default CatAPI;
