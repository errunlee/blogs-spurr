

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import { onSnapshot, doc } from "firebase/firestore";
import TinyMCE from '../components/Blogform/TinyMCE';
import BasicModal from '../components/BasicModal';
export default function Editpost() {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const docRef = doc(db, "blogs", id);

        const unsub = onSnapshot(docRef, (doc) => {
            setBlogData(doc.data());
        });
        setLoading(false)
        return () => {
            unsub();
        };
    }, []);

    if (loading || !blogData) {
        return <BasicModal isLoading={loading} />
    }

    const { title, blog, selectedTags } = blogData;
    console.log(blogData);
    return (
        <>
            {
                blogData ? <>
                    <TinyMCE previousTitle={title} previousVal={blog} editing={true} prevTags={selectedTags} docId={id} />
                </> : <><BasicModal isLoading={loading} /></>

            }
        </>
    )
}
