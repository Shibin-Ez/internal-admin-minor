import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";
import { BASE_URL } from "@/constants/AppConstants";

const formatData = (data: any) => {
    return data.map((student: any) => {
        return {
            ID: student.id,
            NAME: student.name,
            REGNO: student.regNo,
            EMAIL: student.email,
            DEPARTMENT: student.programName,
            SEMESTER: student.semester,
            SECTION: student.sectionBatchName,
            FANAME: student.faName,
            FAEMAIL: student.faEmail,
            ENROLLED: student.enrolled,
        };
    });
};

const fetchUserData = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const response = await axios.get(`${BASE_URL}/students`);
        const data = response.data;
        const formattedData = formatData(data);
        res.status(200).json(formattedData);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default fetchUserData;