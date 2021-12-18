import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";

const WishVideo = ({ src, onEnded, resize }) => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const timer = setTimeout(() => {
        setLoading(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <section id="video-container">
      {loading ? (
        <Spinner
          color="dark"
          style={{
            marginTop: `${resize.height / 2}px`,
            width: `${resize.getWidth(48)}px`,
            height: `${resize.getWidth(48)}px`,
          }}
        />
      ) : (
        <></>
      )}
      <video
        autoPlay
        onEnded={onEnded}
        onLoadedData={() => {
          setLoading(false);
          setLoaded(true);
        }}
      >
        <source src={src} type="video/webm" />
      </video>
    </section>
  );
};

export default WishVideo;
