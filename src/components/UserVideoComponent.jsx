import OpenViduVideoComponent from "./OpenViduVideoComponent";

export default function UserVideoComponent({ streamManager, role }) {
  return (
    <>
      {streamManager !== undefined ? (
        <OpenViduVideoComponent streamManager={streamManager} role={role} />
      ) : null}
    </>
  );
}
