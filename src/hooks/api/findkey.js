import axios from "axios";
import RNFS from 'react-native-fs'
import mime from "mime";
import ImageResizer from '@bam.tech/react-native-image-resizer';




export const FindKey = async (frontImage, backImage) => {
  const URL = 'https://calik.app/api/findkeyApi';
  const startTime = Date.now();
  console.log('Starting API call at:', new Date().toISOString());

  try {
    // Resize and compress images before sending
    const resizedFrontImage = await ImageResizer.createResizedImage(
      frontImage,
      800,    // width
      1200,   // height
      'JPEG',
      70,     // quality (0-100)
      0,      // rotation
    );

    const resizedBackImage = await ImageResizer.createResizedImage(
      backImage,
      800,    // width
      1200,   // height
      'JPEG',
      70,     // quality (0-100)
      0,      // rotation
    );

    console.log('Images resized successfully');

    const formData = new FormData();

    // Add front image
    formData.append('frontKey', {
      uri: resizedFrontImage.uri,
      type: 'image/jpeg',
      name: 'front_image.jpg',
    });

    // Add back image
    formData.append('backKey', {
      uri: resizedBackImage.uri,
      type: 'image/jpeg',
      name: 'back_image.jpg',
    });

    console.log('Sending request to API...');
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Add timeout and other axios configs
      timeout: 30000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log(`API Response received. Total time taken: ${duration} seconds`);
    
    // Clean up temporary resized images
    await RNFS.unlink(resizedFrontImage.path).catch(err => console.log(err));
    await RNFS.unlink(resizedBackImage.path).catch(err => console.log(err));
    
    const parsedData = JSON.parse(response.data.data);
    return {
      parsedData,
      keyId: response.data.key_id,
      duration
    };
  } catch (error) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.error('Error in API call. Time taken before error:', duration, 'seconds');
    console.error('Error details:', error.message);
    throw error;
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
