import useFetchUser from '../utils/useFetchUser';

const DisplayUsername = ({ userId, prefix }) => {
  const { user, isPending, error } = useFetchUser(userId);

  return ( 
    <p>
      {error && <p>{error.message}</p>}
      {isPending && <p>{prefix}</p>}
      {!isPending && user && (
        <p>{prefix}{user.displayName}</p>
      )}
    </p>
  );
}

DisplayUsername.defaultProps = {
  prefix: ''
};
 
export default DisplayUsername;