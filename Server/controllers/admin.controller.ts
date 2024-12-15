import { Request, Response } from 'express';
import prisma from "../utils/prisma";

export const addTour = async (req: Request, res: Response) => {
  const {
    title,
    image,
    price,
    type,
    bestSeller,
    inclusions,
    exclusions,
    sightseeing,
    itinerary
  } = req.body;

  try {
    const tour = await prisma.tour.create({
      data: {
        title,
        image,
        price,
        type,
        bestSeller,
        inclusions: {
          create: inclusions.map((inclusion: { text: string }) => ({
            text: inclusion.text,
          })),
        },
        exclusions: {
          create: exclusions.map((exclusion: { text: string }) => ({
            text: exclusion.text,
          })),
        },
        sightseeing: {
          create: sightseeing.map((sight: { text: string }) => ({
            text: sight.text,
          })),
        },
        itinerary: {
          create: itinerary.map((item: { text: string; description: string }) => ({
            text: item.text,
            description: item.description,
          })),
        },
      },
    });

    res.status(201).json({
      message: 'Tour added successfully',
      tour,
    });
  } catch (error:any) {
    res.status(500).json({
      message: 'Error adding tour',
      error: error.message,
    });
  }
};
