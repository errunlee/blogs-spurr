

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import { onSnapshot, doc } from "firebase/firestore";
import TinyMCE from '../components/Blogform/TinyMCE';
import BasicModal from '../components/BasicModal';
import instance from '../api/instance';
export default function Editpost() {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getBlogData = async () => {
            try {
                const res = await instance.get('/notes/fetchallnotes')
                const blogs = res.data
                const currentBlog = blogs.filter((blog) => blog._id === id)
                setBlogData(currentBlog[0])
            }
            catch (e) {
                console.log(e)
            }

        }
        getBlogData();
        setLoading(false)

    }, []);

    if (loading || !blogData) {
        return <BasicModal isLoading={loading} />
    }

    const { title, blog, selectedTags } = blogData;

    document.title = `${title} | Edit`
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
