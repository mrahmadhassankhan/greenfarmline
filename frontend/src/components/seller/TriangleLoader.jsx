import { Triangle } from "react-loader-spinner";

const TriangleLoader = ({ height }) => {
  return (
    <div
      style={{
        width: "100%",
	height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        color: "#1a1a1a",
        gap: "10px",
      }}
    >
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#1a1a1a"
        ariaLabel="triangle-loading"
      />
      <h3>Loading</h3>
    </div>
  );
};

export default TriangleLoader;
