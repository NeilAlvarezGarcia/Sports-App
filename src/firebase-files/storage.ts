import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { updateUserProfile } from "./authentication";
import app from "./initFirabse";

const storage = getStorage(app);

export async function uploadImageProfile(reference: string, profile: File) {
    try {
        const metadata = {
            contentType: profile.type,
        };  

        const storageRef = ref(storage, reference);

        const uploadTask = await uploadBytesResumable(storageRef, profile, metadata);
        console.log(uploadTask, 'here')
        uploadTask.task.on('state_changed',
        (snapshot) => {},
        (error) => {},
        () => {
            
            getDownloadURL(uploadTask.ref).then((downloadURL: string) => {
                const profile = {
                    photoURL: downloadURL
                };
                updateUserProfile(profile);
            }); 
        }
        );
    } catch(err) {

    }
}