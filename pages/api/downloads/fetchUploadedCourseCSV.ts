import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BASE_URL } from "@/constants/AppConstants";


const fetchUploadedCoursesCSV = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.get(`${BASE_URL}/minors/csv/download`);
        const data = response.data;
        console.log(data);
        res.status(200).json(data);
    } catch (error) {  
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default fetchUploadedCoursesCSV;