import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase';

const copyVideo = async (filePath,storePath) => {
    try {
        const sourceRef = ref(storage, filePath);
        const fileName = filePath.split('/').pop(); // Extract the file name from the path
        const destinationRef = ref(storage, storePath+`/${fileName}`);
        console.log("stored : "+ storePath+"\n"+"path of the file:" + filePath+"\nsource path to : "+sourceRef);

        // Get the download URL for the source file
        const downloadURL = await getDownloadURL(sourceRef);

        // Fetch the file as a Blob
        const response = await fetch(downloadURL);
        const blob = await response.blob();

        // Upload the file to the destination path
        await uploadBytes(destinationRef, blob);

        console.log(`Video copied to mylist/${fileName}`);
    } catch (error) {
        console.error('Error copying video:', error);
    }
};

export default copyVideo;
