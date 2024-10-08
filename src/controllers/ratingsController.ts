import {NextFunction, Request, Response} from "express";
import {
    getAllRatingsService,
    getRatingByMovieIdService,
    createRatingService,
    updateRatingService,
    deleteRatingService
} from "../services/ratingsService";
import {RatingDTO} from "../dtos/rating.dto";

export async function getAllRatings(req: Request, res: Response, next: NextFunction) {
    try {
        const ratings = await getAllRatingsService();
        res.json(ratings);
    } catch (err) {
        next(err);
    }
}

export async function getRatingByMovieId(req: Request, res: Response, next: NextFunction) {
    try {
        const rating = await getRatingByMovieIdService(parseInt(req.params.id));
        if (rating) res.json(rating);
        else res.status(404).json({error: 'Rating not found'});
    } catch (err) {
        next(err);
    }
}

export async function createRating(req: Request, res: Response, next: NextFunction) {
    try {
        const ratingDTO: RatingDTO = req.body;
        const result = await createRatingService(ratingDTO);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}

export async function updateRating(req: Request, res: Response, next: NextFunction) {
    try {
        const ratingDTO: RatingDTO = req.body;
        const result = await updateRatingService(parseInt(req.params.id), ratingDTO.rating);
        if (result) res.json(result);
        else res.status(404).json({error: 'Rating not found'});
    } catch (err) {
        next(err);
    }
}

export async function deleteRating(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await deleteRatingService(parseInt(req.params.id));
        if (result) res.json(result);
        else res.status(404).json({error: 'Rating not found'});
    } catch (err) {
        next(err);
    }
}