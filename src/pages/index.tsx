/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import songs from '../data/songs.json'
import Snowflakes from '../components/snowflakes'
import { useState } from 'react'
import axios from 'axios'


function Home({ s }: any) {
  const [currSong, setCurrSong] = useState<any>(s?.name || '')
  const updateSong = async (song: any) => {
    const res = await axios.get(`https://Music-API.jasonwang105.repl.co/update`, { params: { name: song.name, url: song.url } })
      .catch((err) => console.log(err))
    return "Success"
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-400 to-blue-100'>
      <div className='justify-center flex items-center'>
        <img src='https://kmbdaa.p3cdn1.secureserver.net/wp-content/uploads/2021/11/ACTI-tagline-1536x1151.png' alt='ACTI' className='h-64' />
        <span className='text-white text-7xl font-bol'>Music Selector</span>
      </div>
      <div className='grid grid-cols-2'>
        <div className='grid grid-flow-row'>
          {songs.map((song: any, i: any) => (
            <button
              key={i}
              className={`text-blue-600 font-bold text-lg w-1/2 mx-auto my-5 py-3 rounded-lg border bg-white ${i % 2 == 0 ? 'border-green-600 hover:bg-green-600' : 'border-red-600 hover:bg-red-600'} hover:cursor-pointer`}
              onClick={(e)=>{
                setCurrSong(song)
                updateSong(song)
              }}
            >
              <div>{song.name}</div> 
              <div>by: {song.author}</div>
            </button>
          ))}
        </div>
        <div className='text-4xl font-bold'>
          Currently Playing...
          <div className='my-3'>
            <img src={`${currSong.image ? currSong.image : './images/kosman.jpg'}`} className='border w-1/2 border-blue-700 rounded-3xl' alt='song image' />
          </div>  
          <div>
            {currSong.name ? currSong.name : 'Nothing'}
          </div>
        </div>
      </div>
      <Snowflakes />
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const s = await axios
    .get('https://music-api.jasonwang105.repl.co/song')
    .then((res) => res.data);

  return {
    props: {
      s,
    },
  };
};