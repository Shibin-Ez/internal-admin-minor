import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const formatData = (data: any) => {
    return data.map((course: any) => {
        return {
            ID: course.id,
            NAME: course.name,
            CODE: course.code,
            DEPARTMENT: course.department,
            FACULTY_NAME: course.faculty,
            FACULTY_EMAIL: course.facultyEmail,
            FACULTY_PHONE: course.facultyContact,
            CREDIT: course.credit,
            SCHEDULE: course.schedule,
        };
    });
};


const fetchCoursesData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.get("https://minor-nitc-server.onrender.com/minors");
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