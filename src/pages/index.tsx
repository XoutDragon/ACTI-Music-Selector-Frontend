/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import winterSongs from '../data/songs.json';
import christmasSongs from '../data/christmas.json';
import Snowflakes from '../components/snowflakes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';

function Home({ s }: any) {
  const [currSong, setCurrSong] = useState<any>(s?.name || '');
  const [christmasSongsButton, setChristmasSongsButton] = useState(true);
  const [winterSongsButton, setWinterSongsButton] = useState(true);

  let songs: any = [];

  const updateSongs = async () => {
    if (christmasSongsButton) {
      songs.push(...christmasSongs);
    }
    if (winterSongsButton) {
      songs.push(...winterSongs);
    }
    songs.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    });
  };
  updateSongs();

  const updateSong = async (song: any) => {
    const res = await axios
      .get(`https://Music-API.jasonwang105.repl.co/update`, {
        params: { name: song.name, url: song.url },
      })
      .catch((err) => console.log(err));
    return 'Success';
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-400 to-blue-100'>
      <div className='justify-between flex items-center mx-10'>
        <div className='flex'>
          <img
            src='https://kmbdaa.p3cdn1.secureserver.net/wp-content/uploads/2021/11/ACTI-tagline-1536x1151.png'
            alt='ACTI'
            className='h-40'
          />
          <div className='text-white text-7xl font-bold flex items-center'>
            Music Selector
          </div>
        </div>
        <div>
          <a
            href=''
            className='text-white font-bold flex items-center text-6xl'
          >
            <FaGithub className='mr-5' />
            Github
          </a>
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div>
          <div>
            <div className='text-4xl font-bold text-center'>Select Songs</div>
            <div className='flex justify-center'>
              <button
                className={`${
                  christmasSongsButton
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-blue-700'
                } hover:cursor-pointer hover:bg-blue-700 hover:text-white border-2 border-blue-700 rounded-3xl px-5 py-2 mx-5 my-3`}
                onClick={(e) => {
                  setChristmasSongsButton(!christmasSongsButton);
                }}
              >
                Christmas Songs
              </button>
              <button
                className={`${
                  winterSongsButton
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-blue-700'
                } hover:cursor-pointer hover:bg-blue-700 hover:text-white border-2 border-blue-700 rounded-3xl px-5 py-2 mx-5 my-3`}
                onClick={(e) => {
                  setWinterSongsButton(!winterSongsButton);
                }}
              >
                Winter Songs
              </button>
            </div>
          </div>
          <div className='grid grid-flow-row overflow-y-scroll w-1/2 mx-auto scrollbar-thin scrollbar-thumb-blue-600 dark:scrollbar-track-gray-900 h-80'>
            {songs.map((song: any, i: any) => (
              <button
                key={i}
                className={`hover:cursor-pointer bg-white rounded-3xl w-2/3 mx-auto my-2 min-h-30`}
                onClick={(e) => {
                  setCurrSong(song);
                  updateSong(song);
                }}
              >
                <div className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-lg font-medium'>
                  <div>{song.name}</div>
                  <div>by: {song.author}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className='text-4xl font-bold'>
          Currently Playing...
          <div className='my-3'>
            <img
              src={`${currSong.image ? currSong.image : './images/kosman.jpg'}`}
              className='border w-1/2 border-blue-700 rounded-3xl'
              alt='song image'
            />
          </div>
          <div>{currSong.name ? currSong.name : 'Nothing'}</div>
        </div>
      </div>
      <Snowflakes />
    </div>
  );
}

export default Home;

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
