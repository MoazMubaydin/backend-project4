import { Request, Response, NextFunction } from "express";

import express from "express";

import { Router } from "express";

import prisma from "../db/index";
import { RequestCreateMeal, RequestUpdateMeal } from "../types/requests";

const router = Router();
export default router;

router.post(
  "/meals",
  async (req: RequestCreateMeal, res: Response, next: NextFunction) => {
    try {
      const { name, time, day, recipe_id } = req.body;

      const newMeal = { name, time, day, recipe_id };
      const response = await prisma.meal.create({ data: newMeal });
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to create meal" });
    }
  }
);

router.get(
  "/meals",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await prisma.meal.findMany({
        include: { recipe: true },
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get meals" });
    }
  }
);

router.get(
  "/meals/:mealId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await prisma.meal.findUnique({
        where: { id: req.params.mealId },
        include: { recipe: true },
      });
      if (response === null) {
        res.status(404).json({
          error: "Meal not found",
          message: "A Meal with the specified ID does not exist.",
          id: req.params.mealId,
        });
        return;
      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get meals" });
    }
  }
);

router.patch(
  "/meals/:mealId",
  async (req: RequestUpdateMeal, res: Response, next: NextFunction) => {
    const { name, time, day, recipe_id } = req.body;
    const updatedMeal = { name, time, day, recipe_id };

    try {
      const response = await prisma.meal.update({
        where: { id: req.params.mealId },
        data: updatedMeal,
      });

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update meal" });
    }
  }
);

router.delete("/meals/:mealId", async (req: Request, res: Response) => {
  try {
    const response = await prisma.meal.delete({
      where: { id: req.params.mealId },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete meal" });
  }
});
