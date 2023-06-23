"use client";

import * as React from "react";

import shuffle from "lodash/shuffle";
import PhotoAlbum from "react-photo-album";
import LightboxLib from "yet-another-react-lightbox";

import { images } from "cloudinary/output/photos";

import "yet-another-react-lightbox/styles.css";

const slides = shuffle(images);

export function Lightbox() {
  const [index, setIndex] = React.useState(-1);

  return (
    <>
      <PhotoAlbum
        layout="rows"
        spacing={6}
        photos={slides}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      />

      <LightboxLib
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
}
