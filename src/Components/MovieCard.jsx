import React from 'react'
import noPosterPng from "../assets/moviesImages/no-poster.png"
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useSelector } from 'react-redux'


const MovieCard = ({ item }) => {

    const {
        genre_ids,
        poster_path,
        title,
        name,
        release_date,
        first_air_date,
        vote_average
    } = item;

    const { genres } = useSelector((state) => state.MovieSlice)

    const filteredGenres = genre_ids.map(genresId => {
        const matchedGenre = genres.find(genre => genre.value === genresId);
        return matchedGenre ? matchedGenre.label : null;
    }).filter(Boolean)

    let slicedGenres = filteredGenres.slice(0, 1)

    const formattedVoteAverage = typeof vote_average === 'number' ? vote_average.toFixed(1) : 'N/A';

    return (
        <>

            <div className='min-w-56 rounded-md mt-4 mb-10 relative hover:opacity-50 ease-linear duration-300'>

                <img src={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : noPosterPng} alt={title || name || 'No Poster'} className='w-full min-h-60 rounded-xl mb-1' />

                <div style={{ background: 'white', borderRadius: '50%', width: '48px', height: '48px', position: 'absolute', left: '8px', bottom: '70px', right: '2px' }}>
                    <CircularProgressbar
                        className='h-full w-full'
                        value={Math.trunc(Number(vote_average) * 10)}
                        text={`${formattedVoteAverage}%`}
                        styles={buildStyles({
                            rotation: 0.25,
                            strokeLinecap: 'butt',
                            textSize: '24px',
                            pathTransitionDuration: 0.5,
                            textColor: '#f88',
                            trailColor: '#d6d6d6',
                            backgroundColor: 'transparent',
                        })}
                    />
                </div>

                <div>

                    <div style={{ display: "flex", flexDirection: 'column', gap: '5px', position: 'absolute', right: "2px", bottom: '80px', marginTop: '10px' }}>
                        {slicedGenres.map((e, i) => (
                            <p key={i} className='bg-pink-700 text-white px-2 py-1 rounded-sm text-xs flex'>{e}</p>
                        ))}

                    </div>

                </div>

                <div className='relative text-white'>
                    <h1 className='text-xl mt-4'>{(title || name).length >= 20 ? (title || name).slice(0, 20) + "..." : title || name}</h1>
                    <p className='mt-1 opacity-60 text-sm'>{release_date || first_air_date}</p>
                </div>
            </div>

        </>
    )
}

export default MovieCard;