
import { responder } from '../utils/responder.js';
import course from "../models/course.model.js"

const postVideo = async (req, res) => {
    try {
        const { courseId, video_title, video_url } = req.body;
        const courseData = await course.findById(courseId);  
        if (!courseData) {
        return responder(res, false, "Course not found", 404);
        }
        courseData.videos.unshift({ video_title, video_url });
        await courseData.save();
        return responder(res, true, "Video added successfully",null, 200);
    } catch (error) {
        responder(res, false, `${error.message}`, 500);
    }
}

const getVideo = async (req, res) => {
    try {
        const { courseId } = req.params;
        const courseData = await course.findById(courseId);  
        if (!courseData) {
        return responder(res, false, "Course not found", 404);
        }
        return responder(res, true, "fetch all courses videos",courseData.videos, 200);
    } catch (error) {
        responder(res, false, `${error.message}`, 500);
    }
}

export { postVideo, getVideo }
