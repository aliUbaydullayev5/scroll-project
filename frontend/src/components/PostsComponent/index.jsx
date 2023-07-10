import React, {useEffect, useState} from 'react'
import Container from './style'
import {observer} from "mobx-react-lite"
import postStore from "../../store/postStore"
import Post from "../PostComponent"
import {InView} from "react-intersection-observer"
import {InfinitySpin} from "react-loader-spinner"

const PostsComponent = observer(() => {

    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (inView) postStore.getPosts({pageCount: postStore.currentPage + 1})
    }, [inView])

    console.log(postStore.loading, 'gtdrfsdfr')
    return (
        <Container>
            {postStore.data.map((post) => <Post key={post.id} title={post.title} body={post.body}/>)}
            {
                postStore.loading &&
                <div className={'center'}>
                    <InfinitySpin
                        width='200'
                        color="#4fa94d"

                    />
                </div>
            }
            <InView onChange={setInView}/>
        </Container>
    )
})


export default PostsComponent