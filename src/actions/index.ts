import GoogleMeetAction from "./meet";
import NetflixPlayerAction from "./netflix";
import PrimeVideoPlayerAction from "./primevideo";
import SpotifyPlayerAction from "./spotify";
import YoutubePlayerAction from "./youtube";


// order on the basis of priority
export default [
    YoutubePlayerAction,
    SpotifyPlayerAction,
    NetflixPlayerAction,
    PrimeVideoPlayerAction,
    GoogleMeetAction,
];

