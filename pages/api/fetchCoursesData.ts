import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BASE_URL } from "@/constants/AppConstants";

const formatData = (data: any) => {
    return data.map((course: any) => {
        return {
            ID: course.id,
            NAME: course.name,
            FACULTY_NAME: course.faculty,
            FACULTY_EMAIL: course.facultyEmail,
            DESCRIPTION: course.description
        };
    });
};


const fetchCoursesData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.get(`${BASE_URL}/minors`);
        const data = response.data;
        console.log(data);
        const formattedData = formatData(data);
        res.status(200).json(formattedData);
    } catch (error) {  
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default fetchCoursesData;