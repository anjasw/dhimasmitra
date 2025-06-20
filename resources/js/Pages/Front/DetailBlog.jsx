
import {Head} from '@inertiajs/react';
export default function DetailBlog({posts}){
    console.log(posts)
    return(
        <>
            <Head title={posts.title} />
            <h1>Detail Blog</h1>
            <h2>{posts.title}</h2>
            <h3>{posts.meta_description}</h3>
        </>
    );
}