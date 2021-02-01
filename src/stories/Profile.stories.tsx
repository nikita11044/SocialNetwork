import React from 'react';
import {Story} from "@storybook/react";
import Profile, {ProfilePropsType} from "../components/Profile/Profile";
import {addPost} from "../redux/state";

export default {
    title: 'Profile',
    component: Profile
}

const profilePageData = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11}
    ]
}

const Template: Story<ProfilePropsType> = (args) => <Profile {...args} />
export const ProfileRender = Template.bind({})
ProfileRender.args = {
    /**
     * An array of posts
     */
    posts: profilePageData.posts,
    /**
     * A function that adds a post
     */
    addPost: addPost,
}