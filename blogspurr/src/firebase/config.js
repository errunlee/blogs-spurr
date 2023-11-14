
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc,getDoc } from "firebase/firestore";

export class DbService {

    async addBlog(title,blog) {
        //code to insert blog into database
        try {
            const docRef = await addDoc(collection(db, "blogs"), {
                title,
                blog,
            });
            console.log("Document written with ID: ", docRef.id);
            return true
        } catch (e) {
            console.error("Error adding document: ", e);
            return false
        }
    }

    async getAllBlogs() {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const data = []
        querySnapshot.forEach((doc) => {
            data.push({...doc.data(),id:doc.id})
            console.log(`${doc.id} => ${doc.data()}`);
        });
        return data;
    }

    async deleteBlog(id) {
        await deleteDoc(doc(db, "blogs", id));
    }

    async getDoc(id) {
        const docRef = doc(db, "cities",id );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap
        } else {
            console.log("No such document!");
            return null
        }
    }

}

const dbService = new DbService();

export default dbService
