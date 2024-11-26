
import axios from "axios";
import RNFS from 'react-native-fs'
import mime  from "mime";




export const FindKey = async (frontImage, backImage) => {
  const URL = 'https://calik.app/api/findkeyApi';
  console.log('frontImage: ', frontImage)

  const _Image1 = "file:///" + frontImage.split("file:/").join("");
    // Create a FormData object
    const formData = new FormData(); 
    
  
    // const _data = `frontKey${frontImage}&backKey${backImage}`
    // Append the images to formData
    formData.append('frontKey', {
      uri: _Image1,      // Local path to the front image
      type: mime.getType(_Image1),   // MIME type (use 'image/png' if it's a PNG)
      name: _Image1.split("/").pop(), // Name of the file
    });
  
    formData.append('backKey', {
      uri: _Image1,       // Local path to the back image
      type: mime.getType(_Image1),   // MIME type
      name: _Image1.split("/").pop(), // Name of the file
    });
    const frontImageBase64 =  await convertImageToBase64(frontImage)
    const backImageBase64 =  await convertImageToBase64(backImage)

    // console.log('Base64Image', image)

    // const _data = {
    //   'frontKey': {
    //     fileName: 'frontImage.jpg',   // Optional metadata
    //     fileType: 'image/jpg',        // Optional metadata
    //     uri : frontImage,    // The actual base64 image data
    //   },
    //   'backKey': {    // Optional metadata
    //     fileType: 'image/jpg',        // Optional metadata
    //     fileData: backImage,     // The actual base64 image data
    //   },
    // };
  
    try {
      const response = await axios.post(URL, formData  , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

  
      // Check if the response is successful
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
  
      
      console.log('Response:', response.data);
      return JSON.parse(response.data.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const convertImageToBase64 = async (imagePath) => {
    try {
      const base64String = await RNFS.readFile(imagePath, 'base64');
      return base64String;
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      return null;
    }
  };
  