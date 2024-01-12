// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Paper, Typography, TextField, Button, Grid, CircularProgress } from '@mui/material';
// import WeatherIcon from 'react-icons-weather';

// const apiKeys = {
//   key: '500d336c001021419b278357f22775ad',
//   base: 'https://api.openweathermap.org/data/2.5/',
// };

// const WeatherApp = () => {
//   const [query, setQuery] = useState('');
//   const [weather, setWeather] = useState({});
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [currentTime, setCurrentTime] = useState('');
//   const [currentLocation, setCurrentLocation] = useState('');

//   const search = (location) => {
//     setLoading(true);
//     axios
//       .get(${apiKeys.base}weather?q=${location}&units=metric&APPID=${apiKeys.key})
//       .then((response) => {
//         setWeather(response.data);
//         setQuery('');
//         setError('');
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setWeather({});
//         setQuery('');
//         setError('City not found');
//         setLoading(false);
//       });
//   };

//   const getCurrentLocationWeather = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           axios
//             .get(
//               https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKeys.key}
//             )
//             .then((response) => {
//               const { name, country } = response.data[0];
//               setCurrentLocation(${name}, ${country});
//             })
//             .catch((error) => {
//               console.error(error);
//               setCurrentLocation('Unknown Location');
//             });

//           axios
//             .get(${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeys.key})
//             .then((response) => {
//               setWeather(response.data);
//             })
//             .catch((error) => {
//               console.error(error);
//               setError('Error fetching current weather data');
//             });
//         },
//         (error) => {
//           console.error(error);
//           setError('Error getting current location. Please enter a city manually.');
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by your browser. Please enter a city manually.');
//     }
//   };

//   const getCurrentTime = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();
//     setCurrentTime(${hours}:${minutes < 10 ? '0' : ''}${minutes});
//   };

//   useEffect(() => {
//     getCurrentLocationWeather();
//     getCurrentTime();

//     const intervalId = setInterval(() => {
//       getCurrentTime();
//     }, 60000);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div
//       style={{
//         backgroundSize: 'cover',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundImage:
//           'url("https://img.freepik.com/free-vector/blue-curve-frame-template_53876-116707.jpg?w=1380&t=st=1705058658~exp=1705059258~hmac=f57db1cf3f38984f6377236fc13df6a6e6cfe9da3aabcff154f6c5bef29396f3")',
//       }}
//     >
//       <Container maxWidth="md">
//         <Paper
//           elevation={3}
//           style={{
//             padding: '20px',
//             marginTop: '20px',
//             backgroundImage:
//               'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMQ6P1VgQ8ce3YGgbo029cYxwd9cOxJMUKA&usqp=CAU")',
//             backgroundSize: 'cover',
//             borderRadius: '15px',
//             boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
//             border: '2px solid gray',
//           }}
//         >
//           {loading ? (
//             <LoadingScreen />
//           ) : (
//             <>
//               {weather.main && (
//                 <div style={{ marginTop: '20px' }}>
//                   <Typography variant="h5" gutterBottom>
//                     {weather.name}, {weather.sys.country}
//                   </Typography>
//                   <Typography variant="h6">
//                     Temperature: {Math.round(weather.main.temp)}°C
//                   </Typography>
//                   <Typography variant="body1">
//                     {weather.weather[0].description}
//                   </Typography>
//                   <WeatherIcon
//                     name="owm"
//                     iconId={weather.weather[0].id}
//                     flip="horizontal"
//                     rotate="90"
//                   />
//                 </div>
//               )}

//               <Typography variant="h4" gutterBottom style={{ color: '#333', marginTop: '20px' }}>
//                 Weather App
//               </Typography>

//               <Grid container spacing={2}>
//                 <Grid item xs={8}>
//                   <TextField
//                     fullWidth
//                     label="Enter City"
//                     variant="outlined"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Button
//                     variant="contained"
//                     onClick={() => search(query)}
//                     style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px', borderRadius: '16px' }}
//                   >
//                     Search
//                   </Button>
//                 </Grid>
//               </Grid>
//               {error && (
//                 <Typography variant="body1" color="error" style={{ marginTop: '10px' }}>
//                   {error}
//                 </Typography>
//               )}

//               {!error && (
//                 <>

//                   <Typography variant="h6" style={{ marginTop: '10px' }}>
//                     Current Time: {currentTime}
//                   </Typography>


//                 </>
//               )}
//             </>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// const LoadingScreen = () => (
//   <Grid container direction="column" alignItems="center" spacing={2}>
//     <Grid item>
//       <CircularProgress color="inherit" size={60} />
//     </Grid>
//     <Grid item>
//       <Typography variant="h6" align="center" color="inherit">
//         Detecting your location
//       </Typography>
//     </Grid>
//     <Grid item>
//       <Typography variant="body2" align="center" color="inherit">
//         Your current location will be displayed on the App & used for calculating Real-time weather.
//       </Typography>
//     </Grid>
//   </Grid>
// );

// export default WeatherApp;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, Grid, CircularProgress } from '@mui/material';
import WeatherIcon from 'react-icons-weather';

const apiKeys = {
  key: '500d336c001021419b278357f22775ad',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const WeatherApp = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const search = (location) => {
    setLoading(true);
    axios
      .get(`${apiKeys.base}weather?q=${location}&units=metric&APPID=${apiKeys.key}`)
      .then((response) => {
        setWeather(response.data);
        setQuery('');
        setError('');
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setWeather({});
        setQuery('');
        setError('City not found');
        setLoading(false);
      });
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Get city and country from geolocation using reverse geocoding
          axios
            .get(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKeys.key}`
            )
            .then((response) => {
              const { name, country } = response.data[0];
              setCurrentLocation(`${name}, ${country}`);
            })
            .catch((error) => {
              console.error(error);
              setCurrentLocation('Unknown Location');
            });

          // Fetch current weather data immediately after getting location
          axios
            .get(`${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeys.key}`)
            .then((response) => {
              setWeather(response.data);
            })
            .catch((error) => {
              console.error(error);
              setError('Error fetching current weather data');
            });
        },
        (error) => {
          console.error(error);
          setError('Error getting current location. Please enter a city manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please enter a city manually.');
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    setCurrentTime(`${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
  };

  useEffect(() => {
    getCurrentLocationWeather();
    getCurrentTime();

    // Update current time every minute
    const intervalId = setInterval(() => {
      getCurrentTime();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          'url("https://img.freepik.com/free-vector/blue-curve-frame-template_53876-116707.jpg?w=1380&t=st=1705058658~exp=1705059258~hmac=f57db1cf3f38984f6377236fc13df6a6e6cfe9da3aabcff154f6c5bef29396f3")',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          style={{
            padding: '20px',
            marginTop: '20px',
            backgroundImage:
              'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMQ6P1VgQ8ce3YGgbo029cYxwd9cOxJMUKA&usqp=CAU")',
            backgroundSize: 'cover',
            borderRadius: '15px',
            boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
            border: '2px solid gray',
          }}
        >
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {weather.main && (
                <div style={{ marginTop: '20px' }}>
                  <Typography variant="h5" gutterBottom>
                    {weather.name}, {weather.sys.country}
                  </Typography>
                  <Typography variant="h6">
                    Temperature: {Math.round(weather.main.temp)}°C
                  </Typography>
                  <Typography variant="body1">
                    {weather.weather[0].description}
                  </Typography>
                  <WeatherIcon
                    name="owm"
                    iconId={weather.weather[0].id}
                    flip="horizontal"
                    rotate="90"
                  />
                </div>
              )}

              <Typography variant="h4" gutterBottom style={{ color: '#333', marginTop: '20px' }}>
                Weather App
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Enter City"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    onClick={() => search(query)}
                    style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px', borderRadius: '16px' }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
              {error && (
                <Typography variant="body1" color="error" style={{ marginTop: '10px' }}>
                  {error}
                </Typography>
              )}

              {/* Additional Section for Current Location Weather */}
              {!error && (
                <>
                  <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Current Location Weather
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    Current Time: {currentTime}
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: '5px' }}>
                    Current Temperature: {weather.main ? `${Math.round(weather.main.temp)}°C` : 'Loading...'}
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: '5px' }}>
                    Location: {currentLocation}
                  </Typography>
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

const LoadingScreen = () => (
  <Grid container direction="column" alignItems="center" spacing={2}>
    <Grid item>
      <CircularProgress color="inherit" size={60} />
    </Grid>
    <Grid item>
      <Typography variant="h6" align="center" color="inherit">
        Detecting your location
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body2" align="center" color="inherit">
        Your current location will be displayed on the App & used for calculating Real-time weather.
      </Typography>
    </Grid>
  </Grid>
);

export default WeatherApp;
