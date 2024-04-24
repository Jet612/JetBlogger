import useFetchUser from '../utils/useFetchUser';

const WrittenBy = ({ userId, prefix }) => {
  const { user, isPending, error } = useFetchUser(userId);

  return ( 
    <p>
      {error && <p>{error.message}</p>}
      {isPending && <p>{prefix}</p>}
      {!isPending && user && (
        <p>{prefix} {user.displayName}</p>
      )}
    </p>
  );
}
 
export default WrittenBy;