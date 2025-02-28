export function GridBackground() {
    return (
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>
    );
  }
  
  