export default function ProfileData ({ profile }) {
  return (
    <div>
      <h2>Profile Id: {profile.id}</h2>
      <h2>Handle: {profile.handle}</h2>
      <h2>Owner: {profile.ownedBy}</h2>
    </div>
  );
}