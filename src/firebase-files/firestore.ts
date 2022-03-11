import { collection, doc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { SportSelected } from "../components/CardHome";
import { typeExtraData } from "../Home/UpdateProfile";

const db = getFirestore();
const extraUser = 'extraUser';
const sports = 'sports';

export async function sendExtraUserInformation(id:string, data: typeExtraData) {
    try {
        const res = await getExtraUserInformation(id);

        const newData = {
            ...res,
            ...data
        }

        const userRef = doc(db, extraUser, id);
        await setDoc(userRef, newData);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
export async function getExtraUserInformation(id: string) {
    const q = query(collection(db, extraUser), where("userId", "==", id));
    let extraData: typeExtraData = {}
        
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        extraData = {
            ...doc.data(),
            userId: id
        }
    });

    return extraData;
}

export async function storeSports(id: string, sport: SportSelected) {
    try {
        sport.createdAt = serverTimestamp()

        const userRef = doc(db, `${sports}${id}`, sport.idSport);
        await setDoc(userRef, sport);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}

export async function getSports(id: string) {
    let sportData: any = [];

    const q = query(collection(db, `${sports}${id}`), orderBy('createdAt', 'desc'))
        
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        sportData.push(data);
    });

    return sportData;
}