import { useGoogleRefreshTokenMutation } from "../api/apiSlice";

function Home() {
  const [refreshGoogleToken] = useGoogleRefreshTokenMutation();
  const handlerefresh = async () => {
    try {
      const result = await refreshGoogleToken().unwrap();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button onClick={handlerefresh}>refresh</button>
    </div>
  );
}

export default Home;
