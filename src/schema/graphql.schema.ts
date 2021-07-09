
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    name: string;
}

export interface UpdateUserInput {
    name?: string;
}

export interface CreateVideoInput {
    name: string;
}

export interface UpdateVideoInput {
    name?: string;
}

export interface AddSpeakerInput {
    userId: number;
    videoId: number;
}

export interface User {
    id: string;
    name: string;
    video?: Video[];
}

export interface IQuery {
    getUser(id: string): User | Promise<User>;
    getUsers(): User[] | Promise<User[]>;
    getVideo(id: string): Video | Promise<Video>;
    getVideos(): Video[] | Promise<Video[]>;
}

export interface Video {
    id: string;
    name: string;
    speakers?: User[];
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: string): User | Promise<User>;
    createVideo(createVideoInput: CreateVideoInput): Video | Promise<Video>;
    updateVideo(id: string, updateVideoInput: UpdateVideoInput): Video | Promise<Video>;
    removeVideo(id: string): Video | Promise<Video>;
    addSpeaker(addSpeakerInput: AddSpeakerInput): Speaker | Promise<Speaker>;
}

export interface Speaker {
    userId: string;
    videoId: string;
}
