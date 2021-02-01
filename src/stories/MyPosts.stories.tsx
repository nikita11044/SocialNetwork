import React from 'react';
import {Story} from "@storybook/react";
import MyPosts, {myPostsPropsType} from "../components/Profile/MyPosts/MyPosts";
import {addPost} from "../redux/state";

export default {
    title: 'MyPosts',
    component: MyPosts
}

const posts = [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: "It's my first post", likesCount: 11}
]

const Template: Story<myPostsPropsType> = (args) => <MyPosts {...args}/>
export const MyPostsRender = Template.bind({})
MyPostsRender.args = {
    /**
     * An array of posts
     */
    posts: posts,
    /**
     * A function that adds a post
     */
    addPost: addPost,
}