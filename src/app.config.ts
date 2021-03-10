let config;
!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? config = 'http://localhost:8000' :
    config = 'https://pick-my-flick-api.herokuapp.com';

export const apiConfig = config;