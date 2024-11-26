import RNFS from 'react-native-fs'


export const storeImageLocally = async (uri) => {
    const localPath = `${RNFS.DocumentDirectoryPath}/image_1.jpg`; // Generate a unique file name
    try {
        await RNFS.copyFile(uri, localPath); // Copy image to local file system
        console.log('Image saved locally at:', localPath);
        return localPath; // Return the local path of the saved image
    } catch (error) {
        console.log('Error storing image locally: ', error);
    }
};


export const deleteLocalImage = async (localPath) => {
    try {
        // Check if the file exists before attempting to delete it
        const fileExists = await RNFS.exists(localPath);
        
        if (fileExists) {
            await RNFS.unlink(localPath); // Delete the file
            console.log('Image deleted successfully:', localPath);
        } else {
            console.log('File does not exist at path:', localPath);
        }
    } catch (error) {
        console.log('Error deleting image locally:', error);
    }
};

