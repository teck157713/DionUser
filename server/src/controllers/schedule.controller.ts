import { Request, Response, query } from "express";
import { GetAvailableUsersPaginationRequest, ScheduleRequest } from "../models/schedule.model";
import { auth, firestore } from "../firebase";
import { Filter } from "firebase-admin/firestore";
import { toUser } from "../utils/auth.utils";

export const addSchedule = async (req: Request, res: Response) => {
    try {
        const data = req.body as ScheduleRequest;

        if (req.app.locals.uid !== data.uid) {
            throw {
                code: "unauthorized",
                message: "Only authenticated user can add their own schedule in."
            };
        }

        const response = await firestore
            .collection("/schedules")
            .add(data);

        res.status(200).json({
            id: response.id,
            ...data
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getUserSchedule = async (req: Request, res: Response) => {
    const uid = req.body as string;

    if (req.app.locals.uid !== uid) {
        throw {
            code: "unauthorized",
            message: "Only authenticated user can add their own schedule in."
        };
    }

    const snapshots = await firestore
        .collection("/schedules")
        .where("uid", "==", uid)
        .get();

    const documents = snapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    res.status(200).json(documents);
}

export const getAvailableUsers = async (req: Request, res: Response) => {
    try {
        const data = req.body as GetAvailableUsersPaginationRequest;

        // Get uid of available users
        let query = firestore
            .collection("/schedules")
            .where(
                Filter.or(
                    Filter.where("startTime", "<=", data.startTime),
                    Filter.and(
                        Filter.where("endTime", "!=", null),
                        Filter.where("endTime", ">=", data.startTime)
                    )
                )
            );

        if (data.endTime) {
            if (data.endTime <= data.startTime) {
                throw {
                    code: "failed",
                    message: "endTime cannot be lesser than startTime"
                };
            }
            
            query = query
                .where(
                    Filter.or(
                        Filter.where("endTime", "==", null),
                        Filter.where("startTime", "<=", data.endTime)
                    )
                )
        }

        if (data.startDate) {
            query = query
                .where(
                    Filter.or(
                        Filter.where("startDate", "<=", data.startDate),
                        Filter.and(
                            Filter.where("endDate", "!=", null),
                            Filter.where("endDate", ">=", data.startDate)
                        )
                    )
                )

            if (data.endDate) {
                if (data.endDate <= data.startDate) {
                    throw {
                        code: "failed",
                        message: "endTime cannot be lesser than startTime"
                    };
                }
                
                query = query
                    .where(
                        Filter.or(
                            Filter.where("endTime", "==", null),
                            Filter.where("startTime", "<=", data.endTime)
                        )
                    )
            }
        }

        const snapshots = await query.get();

        const userIds = snapshots.docs
            .map(doc => doc.data().uid)
            .filter((value, index, array) => array.indexOf(value) === index);

        // Get the users information
        const usersInformation = 
            (await Promise.all(
                userIds.map(async (uid) => {
                    const userRecord = await auth.getUser(uid);
                    return toUser(userRecord);
                })
            ))
            .filter(user => !user.disabled);

        res.status(200).json(usersInformation);
    }
    catch (error) {
        res.status(400).json(error);
    }
}
