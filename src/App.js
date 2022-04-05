import { fabric } from 'fabric';
import React, { useState, useEffect, useRef } from 'react';

function FabricTest() {
  const [canvas, setCanvas] = useState('');
  const [bgImg, setBgImg] = useState('');
  const [productImg, setProductImg] = useState('');
  const bgImgInput = useRef();
  const productImgInput = useRef();

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const bgUploadButtonClick = (e) => {
    bgImgInput.current.click();
  };

  const productUploadButtonClick = (e) => {
    productImgInput.current.click();
  };

  const bgUpload = (e) => {
    const { files } = e.target;
    const urlFile = URL.createObjectURL(files[0]);
    console.log(urlFile);
    setBgImg(
      canvas.setBackgroundImage(urlFile, canvas.renderAll.bind(canvas), {
        width: canvas.width,
        height: canvas.height,
        originX: 'left',
        originY: 'top',
      }),
    );
  };

  const productUpload = (e) => {
    const { files } = e.target;
    const urlFile = URL.createObjectURL(files[0]);
    new fabric.Image.fromURL(urlFile, (image) => {
      canvas.add(image);
      canvas.renderAll();
      setProductImg(image);
    });
    console.log(canvas);
  };

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      height: 600,
      width: 600,
      backgroundColor: 'gray',
      zoom: 0.5,
    });

  return (
    <>
      <input
        style={{ display: 'none' }}
        accept="image/*"
        id="files"
        name="img_url"
        type="file"
        // multiple
        content_type="multipart/form-data"
        ref={bgImgInput}
        // required
        onChange={bgUpload}
      />
      <input
        style={{ display: 'none' }}
        accept="image/*"
        id="files"
        name="img_url"
        type="file"
        // multiple
        content_type="multipart/form-data"
        ref={productImgInput}
        // required
        onChange={productUpload}
      />
      <div>
        <button onClick={bgUploadButtonClick}>배경 업로드</button>
        <button onClick={productUploadButtonClick}>상품 업로드</button>
      </div>
      <canvas id="canvas" />
    </>
  );
}

export default FabricTest;
