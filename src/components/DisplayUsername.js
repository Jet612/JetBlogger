import useFetchUser from '../utils/useFetchUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid'

const DisplayUsername = ({ userId, prefix, timestamp }) => {
  const { user, isPending, error } = useFetchUser(userId);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const diff = now-timestamp;

    const seconds = Math.floor(diff/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const years = Math.floor(days/365);

    if (seconds < 60) {
      return `${seconds}s`;
    } else if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days < 365) {
      return `${days}d`;
    } else {
      return `${years}y`;
    }
  };

  return ( 
    <div>
      {error && <p>{error.message}</p>}
      {isPending && <p>{prefix}</p>}
      {!isPending && user && !timestamp && (
        <p>
          {prefix}{user.displayName}
        </p>
      )}
      {!isPending && user && timestamp && (
        <p>
          {prefix}{user.displayName} <FontAwesomeIcon icon={faCircle} style={{"max-width": "4px", "color": "var(--secondary-color)"}} /> <time className="timestamp" dateTime={timestamp.toDate().toISOString()}>{timeAgo(timestamp.toDate())}</time> 
        </p>
      )}
    </div>
  );
}

DisplayUsername.defaultProps = {
  prefix: '',
  timestamp: null
};
 
export default DisplayUsername;